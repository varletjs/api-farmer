import { resolve } from 'path'
import ejs from 'ejs'
import fse from 'fs-extra'
import openapiTS, { astToString, OpenAPI3, OperationObject, ResponseObject } from 'openapi-typescript'
import prettier from 'prettier'
import { groupBy, isArray, merge } from 'rattail'
import { logger } from 'rslog'
import { getConfig } from './config'
import { CWD } from './constants'
import { createTransformer, Transformer } from './transformer'
import {
  createStatusCodesByStrategy,
  hasQueryParameter,
  hasResponseBody,
  Preset,
  readSchema,
  readTemplateFile,
  StatusCodes,
  StatusCodeStrategy,
} from './utils'

export interface ApiModulePayload {
  fn: string
  path: string
  url: string
  method: string
  verb: string
  entity: string
  type: string
  typeValue: string
  typeQuery: string
  typeQueryValue: string
  typeRequestBody: string
  typeRequestBodyValue: string
  typeResponseBody: string
  typeResponseBodyValue?: string
}

export interface ApiModule {
  name: string
  payloads: ApiModulePayload[]
}

export interface ApiModuleTemplateData {
  apiModule: ApiModule
  typesFilename: string
  ts: boolean
}

export interface GenerateOptions {
  input?: string
  output?: string
  base?: string
  typesFilename?: string
  transformer?: Partial<Transformer>
  ts?: boolean
  override?: boolean | string[]
  preset?: Preset
  statusCodeStrategy?: StatusCodeStrategy
  statusCodes?: {
    get?: number
    post?: number
    put?: number
    delete?: number
    patch?: number
    options?: number
    head?: number
  }
}

export function partitionApiModules(
  schema: OpenAPI3,
  transformer: Transformer,
  options: {
    ts: boolean
    statusCodes: StatusCodes
    base?: string
  },
): ApiModule[] {
  const { statusCodes, base } = options
  const schemaPaths = schema.paths ?? {}
  const schemaPathKeys = base ? Object.keys(schemaPaths).map((key) => key.replace(base, '')) : Object.keys(schemaPaths)
  const keyToPaths = groupBy(schemaPathKeys, (key) => key.split('/')[1])

  const apiModules = Object.entries(keyToPaths).reduce((apiModules, [name, paths]) => {
    const payloads = paths.reduce((payloads, path) => {
      path = base ? base + path : path
      const pathItems = schemaPaths[path] as Record<string, OperationObject>
      const childPayloads = Object.entries(pathItems).reduce((payloads, [method, operation]) => {
        const url = transformer.url(path, base)
        const entity = transformer.entity(path, method, base)
        const verb = transformer.verb(method)
        const fn = transformer.fn(verb, entity)
        const type = transformer.type(verb, entity)
        const typeValue = transformer.typeValue(path, method)
        const typeQuery = transformer.typeQuery(verb, entity)
        const typeQueryValue = hasQueryParameter(operation) ? transformer.typeQueryValue(type) : 'never'
        const typeRequestBody = transformer.typeRequestBody(verb, entity)
        const typeRequestBodyValue = operation.requestBody ? transformer.typeRequestBodyValue(type) : 'never'
        const typeResponseBody = transformer.typeResponseBody(verb, entity)

        const statusCode = statusCodes[method as keyof StatusCodes] ?? 200
        const mime = (operation.responses?.[statusCode] as ResponseObject).content?.['application/json']
          ? 'application/json'
          : '*/*'
        const typeResponseBodyValue = hasResponseBody(operation)
          ? transformer.typeResponseBodyValue(type, statusCode, mime)
          : 'never'

        payloads.push({
          fn,
          path,
          url,
          method,
          verb,
          entity,
          type,
          typeValue,
          typeQuery,
          typeQueryValue,
          typeRequestBody,
          typeRequestBodyValue,
          typeResponseBody,
          typeResponseBodyValue,
        })

        return payloads
      }, [] as ApiModulePayload[])

      payloads.push(...childPayloads)

      return payloads
    }, [] as ApiModulePayload[])

    apiModules.push({ name, payloads })

    return apiModules
  }, [] as ApiModule[])

  return apiModules
}

export function renderApiModules(
  apiModules: ApiModule[],
  options: {
    output: string
    typesFilename: string
    ts: boolean
    override: boolean | string[]
    preset: Preset
  },
) {
  const { output, ts, override, preset } = options
  const templateFile = readTemplateFile(preset)
  const typesFilename = options.typesFilename.replace('.ts', '')

  return Promise.all(
    apiModules.map(
      (apiModule) =>
        new Promise((promiseResolve) => {
          const data: ApiModuleTemplateData = {
            apiModule,
            typesFilename,
            ts,
          }

          prettier
            .format(ejs.render(templateFile, data), {
              parser: 'typescript',
              semi: false,
              singleQuote: true,
              printWidth: 120,
            })
            .then((content) => {
              const path = resolve(output, `${apiModule.name}.${ts ? 'ts' : 'js'}`)

              if ((!override || (isArray(override) && !override.includes(apiModule.name))) && fse.existsSync(path)) {
                logger.warn(`File already exists, skip: ${path}`)
                promiseResolve(content)
                return
              }

              fse.outputFileSync(path, content)
              logger.success(`Generated ${path}`)
              promiseResolve(content)
            })
        }),
    ),
  )
}

export async function generateTypes(schema: OpenAPI3, output: string, typesFilename: string) {
  const ast = await openapiTS(schema)
  const contents = astToString(ast)
  const typesFilepath = resolve(CWD, output, typesFilename)
  fse.outputFileSync(typesFilepath, contents)
  logger.success(`Generated ${typesFilepath}`)
}

export async function generate(userOptions: GenerateOptions = {}) {
  const config = await getConfig()
  const options = merge(config, userOptions)

  const {
    base,
    ts = true,
    override = true,
    preset = 'axle',
    statusCodeStrategy = 'strict',
    input = './schema.json',
    output = './src/apis',
    typesFilename = 'types.generated.ts',
    transformer = {},
  } = options

  const statusCodes = {
    ...createStatusCodesByStrategy(statusCodeStrategy),
    ...(options.statusCodes ?? {}),
  }

  const mergedTransformer = { ...createTransformer(), ...transformer }

  const schema = await readSchema(input)

  logger.info('Generating API modules...')

  if (ts) {
    await generateTypes(schema, output, typesFilename)
  }

  const apiModules = partitionApiModules(schema, mergedTransformer, { statusCodes, ts, base })
  await renderApiModules(apiModules, { output, typesFilename, ts, override, preset })
  logger.success('Done')
}

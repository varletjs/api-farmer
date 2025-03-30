import { resolve } from 'path'
import ejs from 'ejs'
import fse from 'fs-extra'
import openapiTS, { astToString, OpenAPI3, OperationObject } from 'openapi-typescript'
import prettier from 'prettier'
import { groupBy, isArray, merge } from 'rattail'
import { logger } from 'rslog'
import { getConfig } from './config'
import { CWD, SUPPORTED_HTTP_METHODS } from './constants'
import { createTransformer, Transformer, TransformerBaseArgs } from './transformer'
import {
  getRequestBodyContentType,
  getResponseMetadataItems,
  isRequiredRequestBody,
  Preset,
  readSchema,
  readTemplateFile,
} from './utils'

export interface ApiModuleTemplateData {
  /**
   * API module metadata
   */
  apiModule: ApiModule
  /**
   * The name of the generated api ts type aggregation file
   */
  typesFilename: string
  /**
   * Whether to generate ts code
   */
  ts: boolean
  /**
   * Whether to generate only types
   */
  typesOnly: boolean
}

export interface ApiModule {
  /**
   * The name of the API module
   */
  name: string
  /**
   * API module payloads
   */
  payloads: ApiModulePayload[]
}

export interface ApiModulePayload {
  /**
   * The name of the API function/dispatcher, such as apiGetUsers, apiCreatePost, apiUpdateComment, etc.
   */
  fn: string
  /**
   * The URL of the API endpoint, such as /users, /posts, /comments, etc.
   */
  url: string
  /**
   * The HTTP method of the API endpoint, such as get, post, put, delete, etc.
   */
  method: string
  /**
   * The HTTP verb of the API endpoint, such as Get, Create, Update, Delete, etc.
   */
  verb: string
  /**
   * The entity name of the API endpoint, such as User, Comment, Post, etc.
   */
  entity: string
  /**
   * The request content type of the API endpoint, such as 'application/json', 'application/x-www-form-urlencoded'.
   */
  requestContentType?: string
  /**
   * The type name of the API endpoint, such as ApiGetUsers, ApiCreatePost, ApiUpdateComment, etc.
   */
  type: string
  /**
   * The value of the type of the API endpoint, such as paths['/users']['get'], paths['/posts']['post'], paths['/comments']['put'], etc.
   */
  typeValue: string
  /**
   * The type name of the query parameters of the API endpoint, such as ApiGetUsersQuery, ApiCreatePostQuery, ApiUpdateCommentQuery, etc.
   */
  typeQuery: string
  /**
   * The value of the type of the query parameters of the API endpoint, such as ApiGetUsersQuery['parameters']['query'], ApiCreatePostQuery['parameters']['query'], ApiUpdateCommentQuery['parameters']['query'], etc.
   */
  typeQueryValue: string
  /**
   * The type name of the request body of the API endpoint, such as ApiGetUsersRequestBody, ApiCreatePostRequestBody, ApiUpdateCommentRequestBody, etc.
   */
  typeRequestBody: string
  /**
   * The value of the type of the request body of the API endpoint, such as ApiGetUsersRequestBody['requestBody']['content']['application/json'], ApiCreatePostRequestBody['requestBody']['content']['application/json'], ApiUpdateCommentRequestBody['requestBody']['content']['application/json'], etc.
   */
  typeRequestBodyValue: string
  /**
   * The type name of the response body of the API endpoint, such as ApiGetUsersResponseBody, ApiCreatePostResponseBody, ApiUpdateCommentResponseBody, etc.
   */
  typeResponseBody: string
  /**
   * The value of the type of the response body of the API endpoint, such as ApiGetUsersResponseBody['responses']['200']['content']['application/json'], ApiCreatePostResponseBody['responses']['201']['content']['application/json'], ApiUpdateCommentResponseBody['responses']['200']['content']['application/json'], etc.
   */
  typeResponseBodyValue: string
}

export interface GenerateOptions {
  /**
   * The path to the OpenAPI/Swagger schema file.
   * @default './schema.json'
   */
  input?: string
  /**
   * The path to the output directory.
   * @default './src/apis/generated'
   */
  output?: string
  /**
   * The base path of the API endpoints.
   */
  base?: string
  /**
   * The filename of the generated openapi types file.
   * @default '_types.ts'
   */
  typesFilename?: string
  /**
   * Whether to generate TypeScript code.
   * @default true
   */
  ts?: boolean
  /**
   * Whether to generate only types.
   * @default false
   */
  typesOnly?: boolean
  /**
   * Whether to override the existing files, or an array of filenames to override.
   * @default true
   */
  overrides?: boolean | string[]
  /**
   * The preset ejs template to use.
   * @default 'axle'
   */
  preset?: Preset
  /**
   * Defines which return status codes will be typed
   * @default (status) => status >= 200 && status < 300
   */
  validateStatus?: (status: number) => boolean
  /**
   * The transformer api options, used to override the default transformation rules.
   */
  transformer?: Partial<Transformer>
  /**
   * Certain uncountable nouns that do not change from singular to plural
   */
  uncountableNouns?: string[]
}

export function transformPayloads(
  pathItems: Record<string, OperationObject>,
  options: {
    path: string
    transformer: Transformer
    base: string | undefined
    uncountableNouns: string[]
    validateStatus: (status: number) => boolean
  },
) {
  const { transformer, path, base, uncountableNouns, validateStatus } = options
  return Object.entries(pathItems)
    .filter(([key]) => SUPPORTED_HTTP_METHODS.includes(key))
    .reduce((payloads, [method, operation]) => {
      const url = transformer.url({ path, base })
      const args: TransformerBaseArgs = { path, base, url, method, uncountableNouns, operation }
      const entity = transformer.entity(args)
      const verb = transformer.verb(args)
      const requestContentType = operation.requestBody ? getRequestBodyContentType(operation.requestBody) : undefined
      const responseMetadataItems = getResponseMetadataItems(operation, validateStatus)

      const fn = transformer.fn({ ...args, verb, entity })
      const type = transformer.type({ ...args, verb, entity })
      const typeValue = transformer.typeValue({ ...args, verb, entity })

      const typeQuery = transformer.typeQuery({ ...args, type, verb, entity })
      const typeQueryValue = transformer.typeQueryValue({ ...args, type, verb, entity })

      const typeRequestBody = transformer.typeRequestBody({ ...args, type, verb, entity })
      const typeRequestBodyValue =
        operation.requestBody && requestContentType
          ? transformer.typeRequestBodyValue({
              ...args,
              type,
              verb,
              entity,
              required: isRequiredRequestBody(operation.requestBody),
              requestContentType,
            })
          : 'undefined'

      const typeResponseBody = transformer.typeResponseBody({ ...args, type, verb, entity })
      const typeResponseBodyValue =
        responseMetadataItems.length > 0
          ? transformer.typeResponseBodyValue({ ...args, type, verb, entity, responseMetadataItems })
          : 'undefined'

      payloads.push({
        fn,
        url,
        method,
        verb,
        entity,
        requestContentType,
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
}

export function partitionApiModules(
  schema: OpenAPI3,
  options: {
    transformer: Transformer
    base: string | undefined
    uncountableNouns: string[]
    validateStatus: (status: number) => boolean
  },
): ApiModule[] {
  const { base, transformer, uncountableNouns, validateStatus } = options

  const schemaPaths = schema.paths ?? {}
  const schemaPathKeys = base ? Object.keys(schemaPaths).map((key) => key.replace(base, '')) : Object.keys(schemaPaths)
  const keyToPaths = groupBy(schemaPathKeys, (key) => key.split('/')[1])
  const apiModules = Object.entries(keyToPaths).reduce((apiModules, [name, paths]) => {
    const payloads = paths.reduce((payloads, path) => {
      const pathItems = schemaPaths[path] as Record<string, OperationObject>

      payloads.push(
        ...transformPayloads(pathItems, {
          ...options,
          path: base ? base + path : path,
          transformer,
          uncountableNouns,
          validateStatus,
        }),
      )

      return payloads
    }, [] as ApiModulePayload[])

    apiModules.push({ name: transformer.moduleName({ name }), payloads })

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
    typesOnly: boolean
    overrides: boolean | string[]
    preset: Preset
  },
) {
  const { output, ts, typesOnly, overrides, preset } = options
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
            typesOnly,
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
              const shouldSkip =
                (!overrides || (isArray(overrides) && !overrides.includes(apiModule.name))) && fse.existsSync(path)

              if (shouldSkip) {
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
    typesOnly = false,
    overrides = true,
    preset = 'axle',
    input = './schema.json',
    output = './src/apis/generated',
    typesFilename = '_types.ts',
    validateStatus = (status: number) => status >= 200 && status < 300,
    transformer = {},
    uncountableNouns = [],
  } = options

  const mergedTransformer = { ...createTransformer(), ...transformer }

  const schema = await readSchema(input)

  logger.info('Generating API modules...')

  if (ts) {
    await generateTypes(schema, output, typesFilename)
  }

  const apiModules = partitionApiModules(schema, {
    base,
    uncountableNouns,
    transformer: mergedTransformer,
    validateStatus,
  })

  await renderApiModules(apiModules, { output, typesFilename, ts, typesOnly, overrides, preset })
  logger.success('Done')
}

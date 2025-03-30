import { resolve } from 'path'
import { createAxle } from '@varlet/axle'
import fse from 'fs-extra'
import { OpenAPI3, OperationObject, ReferenceObject, RequestBodyObject, ResponseObject } from 'openapi-typescript'
import { tryParseJSON } from 'rattail'
import { logger } from 'rslog'
import swagger from 'swagger2openapi'
import yaml from 'yaml'
import { CLI_PACKAGE_JSON, CUSTOM_TEMPLATE_FILE, CWD } from './constants'

export type Preset = 'axle' | 'axios'

export type StatusCodeStrategy = 'strict' | 'loose' | 'smart'

export interface StatusCodes {
  get?: number
  post?: number
  put?: number
  delete?: number
  patch?: number
  options?: number
  head?: number
}

export function createStatusCodesByStrategy(strategy: StatusCodeStrategy) {
  return {
    strict: {
      get: 200,
      post: 201,
      put: 200,
      delete: 204,
      patch: 200,
      options: 204,
      head: 200,
    },
    loose: {
      get: 200,
      post: 200,
      put: 200,
      delete: 200,
      patch: 200,
      options: 200,
      head: 200,
    },
    smart: {
      get: 200,
      post: 200,
      put: 200,
      delete: 200,
      patch: 200,
      options: 200,
      head: 200,
    },
  }[strategy]
}

export async function readSchema(input: string): Promise<OpenAPI3> {
  const content = await readSchemaContent(input)
  const jsonSchema = tryParseJSON(content)
  const swaggerOrOpenapiSchema = jsonSchema ? jsonSchema : yaml.parse(content)
  const schema: OpenAPI3 = swaggerOrOpenapiSchema.swagger
    ? (await swagger.convert(swaggerOrOpenapiSchema as any, {})).openapi
    : swaggerOrOpenapiSchema

  return schema
}

export function getSchemaNode(schema: OpenAPI3, path: string) {
  const paths = path.split('/')

  return paths.reduce((node: any, path) => node[path], schema)
}

export async function readSchemaContent(input: string) {
  if (isRemoteSchema(input)) {
    try {
      logger.info('Fetching remote schema...')
      const { data } = await createAxle().get(input)

      return JSON.stringify(data)
    } catch {
      throw new Error('Failed to fetch remote schema')
    }
  }

  const path = resolve(CWD, input)
  const content = fse.readFileSync(path, 'utf-8')

  return content
}

export function isRemoteSchema(path: string) {
  return path.startsWith('http://') || path.startsWith('https://')
}

export function readTemplateFile(preset: Preset = 'axle') {
  if (fse.existsSync(CUSTOM_TEMPLATE_FILE)) {
    return fse.readFileSync(CUSTOM_TEMPLATE_FILE, 'utf-8')
  }

  return fse.readFileSync(resolve(__dirname, `../templates/${preset}.ejs`), 'utf-8')
}

export function getCliVersion() {
  return fse.readJsonSync(CLI_PACKAGE_JSON).version
}

export function isRequiredRequestBody(value: RequestBodyObject | ReferenceObject) {
  return 'required' in value && value.required === true
}

export function findObjectKey(object: Record<string, any>, targetKeys: string[]) {
  return Object.keys(object).find((key) => targetKeys.includes(key))
}

export function getRequestBodyContentType(value: RequestBodyObject | ReferenceObject) {
  if (!('content' in value)) {
    return ''
  }

  return findObjectKey(value.content, ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'])
}

export type ResponseMetadataItem = { status: number; responseContentType: string }

export function getResponseMetadataItems(
  operation: OperationObject,
  validateStatus: (status: number) => boolean,
): ResponseMetadataItem[] {
  const responses = operation.responses ?? {}
  const validStatusResults = Object.keys(responses)
    .sort((a, b) => Number(a) - Number(b))
    .filter((key) => validateStatus(Number(key)))
    .map(Number)

  const metadataItems = validStatusResults
    .map((status) => {
      const content = (operation.responses?.[status] as ResponseObject | undefined)?.content ?? {}
      const responseContentType = findObjectKey(content, ['application/json', '*/*'])

      return {
        status,
        responseContentType,
      }
    })
    .filter((result) => result.responseContentType) as ResponseMetadataItem[]

  return metadataItems
}

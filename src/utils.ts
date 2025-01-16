import { resolve } from 'path'
import fse from 'fs-extra'
import { OpenAPI3, OperationObject, ReferenceObject, RequestBodyObject, ResponseObject } from 'openapi-typescript'
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
  const isYaml = input.endsWith('.yaml')
  const path = resolve(CWD, input)
  const content = fse.readFileSync(path, 'utf-8')
  const swaggerOrOpenapiSchema = isYaml ? yaml.parse(content) : JSON.parse(content)
  const schema: OpenAPI3 = swaggerOrOpenapiSchema.swagger
    ? (await swagger.convert(swaggerOrOpenapiSchema as any, {})).openapi
    : swaggerOrOpenapiSchema

  return schema
}

export function readTemplateFile(preset: Preset = 'axle') {
  if (fse.existsSync(CUSTOM_TEMPLATE_FILE)) {
    return fse.readFileSync(CUSTOM_TEMPLATE_FILE, 'utf-8')
  }

  return fse.readFileSync(resolve(__dirname, `../templates/${preset}.ejs`), 'utf-8')
}

export function hasQueryParameter(operation: OperationObject) {
  return (operation.parameters ?? []).some((param) => 'in' in param && param.in === 'query')
}

export function getCliVersion() {
  return fse.readJsonSync(CLI_PACKAGE_JSON).version
}

export function isRequiredRequestBody(value: RequestBodyObject | ReferenceObject) {
  return 'required' in value && value.required === true
}

export function doStatusCodeStrategy(operation: OperationObject, statusCode: number, strategy: StatusCodeStrategy) {
  if (strategy === 'smart') {
    const responses = operation.responses ?? {}
    const codeKey = Object.keys(responses)
      .sort((a, b) => Number(a) - Number(b))
      .find((codeKey) => Number(codeKey) >= statusCode && Number(codeKey) <= 299)

    if (!codeKey) {
      return {
        statusCode: undefined,
        mime: undefined,
      }
    }

    statusCode = Number(codeKey)
  }

  const content = (operation.responses?.[statusCode] as ResponseObject | undefined)?.content
  const mime = content?.['application/json'] ? 'application/json' : content?.['*/*'] ? '*/*' : undefined

  return {
    statusCode,
    mime,
  }
}

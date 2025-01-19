import { OperationObject } from 'openapi-typescript'
import pluralize from 'pluralize'
import { camelize, pascalCase } from 'rattail'
import { ResponseMetadataItem } from './utils'

export type TransformerBaseArgs = {
  path: string
  base: string | undefined
  url: string
  method: string
  operation: OperationObject
}

export function transformModuleName({ name }: { name: string }) {
  return camelize(name)
}

export function transformUrl({ path, base }: { path: string; base: string | undefined }) {
  return (base ? path.replace(base, '') : path).replace(/{/g, ':').replace(/}/g, '')
}

export function transformVerb({ method }: { method: string }) {
  switch (method) {
    case 'post':
      return 'Create'
    case 'put':
      return 'Update'
    default:
      return pascalCase(method)
  }
}

export function transformEntity({ path, method, base }: TransformerBaseArgs) {
  path = base ? path.replace(base, '') : path

  const words = path.split('/').filter(Boolean)
  return words.reduce((entity, word, index) => {
    if (word.includes('{')) {
      return entity
    }

    word = word.replace(/\.([a-z])/g, (_, p) => p.toUpperCase())
    word = pluralize.singular(pascalCase(word))

    if (method === 'get' && index === words.length - 1) {
      word = pluralize.plural(word)
    }

    return `${entity}${word}`
  }, '')
}

export function transformFn({ verb, entity }: { verb: string; entity: string } & TransformerBaseArgs) {
  return `api${verb}${entity}`
}

export function transformType({ verb, entity }: { verb: string; entity: string } & TransformerBaseArgs) {
  return `Api${verb}${entity}`
}

export function transformTypeValue({ path, method }: { verb: string; entity: string } & TransformerBaseArgs) {
  return `paths['${path}']['${method}']`
}

export function transformTypeQuery({ type }: { type: string; verb: string; entity: string } & TransformerBaseArgs) {
  return `${type}Query`
}

export function transformTypeQueryValue({
  type,
}: { type: string; verb: string; entity: string } & TransformerBaseArgs) {
  return `${type}['parameters']['query']`
}

export function transformTypeRequestBody({
  type,
}: { type: string; verb: string; entity: string } & TransformerBaseArgs) {
  return `${type}RequestBody`
}

export function transformTypeRequestBodyValue({
  type,
  required,
}: { type: string; verb: string; entity: string; required: boolean } & TransformerBaseArgs) {
  return required
    ? `${type}['requestBody']['content']['application/json']`
    : `NonNullable<${type}['requestBody']>['content']['application/json'] | undefined`
}

export function transformTypeResponseBody({
  type,
}: { type: string; verb: string; entity: string } & TransformerBaseArgs) {
  return `${type}ResponseBody`
}

export function transformTypeResponseBodyValue({
  type,
  responseMetadataItems,
}: {
  type: string
  verb: string
  entity: string
  responseMetadataItems: ResponseMetadataItem[]
} & TransformerBaseArgs) {
  return responseMetadataItems
    .map(({ status, mime }) => `${type}['responses']['${status}']['content']['${mime}']`)
    .join(' | ')
}

export interface Transformer {
  moduleName: typeof transformModuleName
  verb: typeof transformVerb
  url: typeof transformUrl
  entity: typeof transformEntity
  fn: typeof transformFn
  type: typeof transformType
  typeValue: typeof transformTypeValue
  typeQuery: typeof transformTypeQuery
  typeQueryValue: typeof transformTypeQueryValue
  typeRequestBody: typeof transformTypeRequestBody
  typeRequestBodyValue: typeof transformTypeRequestBodyValue
  typeResponseBody: typeof transformTypeResponseBody
  typeResponseBodyValue: typeof transformTypeResponseBodyValue
}

export function createTransformer(): Transformer {
  return {
    moduleName: transformModuleName,
    verb: transformVerb,
    url: transformUrl,
    entity: transformEntity,
    fn: transformFn,
    type: transformType,
    typeValue: transformTypeValue,
    typeQuery: transformTypeQuery,
    typeQueryValue: transformTypeQueryValue,
    typeRequestBody: transformTypeRequestBody,
    typeRequestBodyValue: transformTypeRequestBodyValue,
    typeResponseBody: transformTypeResponseBody,
    typeResponseBodyValue: transformTypeResponseBodyValue,
  }
}

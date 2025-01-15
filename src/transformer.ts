import pluralize from 'pluralize'
import { pascalCase } from 'rattail'

export function transformVerb(method: string) {
  switch (method) {
    case 'post':
      return 'Create'
    case 'put':
      return 'Update'
    default:
      return pascalCase(method)
  }
}

export function transformUrl(path: string, base?: string) {
  return (base ? path.replace(base, '') : path).replace(/{/g, ':').replace(/}/g, '')
}

export function transformEntity(path: string, method: string, base?: string) {
  path = base ? path.replace(base, '') : path

  const words = path.split('/').filter(Boolean)
  return words.reduce((entity, word, index) => {
    if (word.includes('{')) {
      return entity
    }

    word = pluralize.singular(pascalCase(word))

    if (method === 'get' && index === words.length - 1) {
      word = pluralize.plural(word)
    }

    return `${entity}${word}`
  }, '')
}

export function transformFn(verb: string, entity: string) {
  return `api${verb}${entity}`
}

export function transformType(verb: string, entity: string) {
  return `Api${verb}${entity}`
}

export function transformTypeValue(path: string, method: string) {
  return `paths['${path}']['${method}']`
}

export function transformTypeQuery(verb: string, entity: string) {
  return `Api${verb}${entity}Query`
}

export function transformTypeQueryValue(type: string) {
  return `${type}['parameters']['query']`
}

export function transformTypeRequestBody(verb: string, entity: string) {
  return `Api${verb}${entity}RequestBody`
}

export function transformTypeRequestBodyValue(type: string) {
  return `${type}['requestBody']['content']['application/json']`
}

export function transformTypeResponseBody(verb: string, entity: string) {
  return `Api${verb}${entity}ResponseBody`
}

export function transformTypeResponseBodyValue(type: string, code: number) {
  return `${type}['responses']['${code}']['content']['application/json']`
}

export interface Transformer {
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

import { defineConfig } from 'api-farmer'
import { factory } from 'typescript'

const BLOB = factory.createTypeReferenceNode(factory.createIdentifier('Blob')) // `Blob`
const NULL = factory.createLiteralTypeNode(factory.createNull()) // `null`

export default defineConfig({
  input: '../schema/openapi.schema.yaml',
  openapiOptions: {
    transform(schemaObject) {
      if (schemaObject.format === 'binary') {
        return schemaObject.nullable ? factory.createUnionTypeNode([BLOB, NULL]) : BLOB
      }
      return undefined
    },
  },
})

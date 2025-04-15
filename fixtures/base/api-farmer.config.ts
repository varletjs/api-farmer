import { defineConfig } from 'api-farmer'

export default defineConfig({
  input: './openapi.schema.yaml',
  base: '/api/v1',
})

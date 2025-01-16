# api-farmer

### Intro

API module generation tool based on `Openapi3/Swagger2`.

### Features

- 🌐 &nbsp; Supports generating all API modules from `OpenAPI3/Swagger2 schemas`
- 📦 &nbsp; Supports generating `ts/js` modules
- 🛠️ &nbsp; Comprehensive `ts type` generation
- ✏️ &nbsp; Supports custom `ejs` templates for tailored content generation
- 🔄 &nbsp; Allows using a `transformer` to modify all variables in templates for fine-grained customization
- 💻 &nbsp; Supports both `cli` and `node.js api`
- 📋 &nbsp; Includes built-in presets for [axle](https://github.com/varletjs/axle) and [axios](https://axios-http.com/docs/intro) templates

### Quick Start

#### 1. Installation

```shell
# npm
npm i api-farmer -D
# yarn
yarn add api-farmer -D
# pnpm
pnpm i api-farmer -D
```

#### 2. Setup

```ts
// in project root path api-farmer.config.ts or api-farmer.config.js
import { defineConfig } from 'api-farmer'

export default defineConfig({
  // openapi or swagger schema path, defaults './schema.json'
  input: './schema.yaml',
  // generated codes output path, defaults './src/apis'
  output: './src/apis',
  // 'axle' or 'axios', defaults 'axle'.
  preset: 'axios',
})
```

#### 3. Run Command

```shell
npx af
```

> [!TIP]
> The generated content does not include the integration of the request client.

#### Some Examples

Some simple usage examples can be found [here](fixtures)

### Custom EJS Template

Create `api-farmer.ejs` in the project root, which will replace the `preset` template.
The template format can refer to the preset template listed below:

- [Axle](templates/axle.ejs)
- [Axios](templates/axios.ejs)

See the bottom of the document for template variable definitions.

### Status Code Strategy

`Restful API` recommends using different successful http status codes for different methods, such as `get: 200`, `post: 201`, etc. If you don't need this strategy, you can set `statusCodeStrategy` to `loose`

```ts
// api-farmer.config.ts
import { defineConfig } from 'api-farmer'

export default defineConfig({
  // 'strict' or 'loose', defaults 'strict'
  statusCodeStrategy: 'loose',
})
```

### Transformer API

You can use the Transformer API to further define template variables, which will override the default transformation rules.

```ts
// api-farmer.config.ts
import { defineConfig } from 'api-farmer'

export default defineConfig({
  transformer: {
    moduleName({ name }) {
      // The new module name.
      return `${name}.generated`
    },
    verb() {},
    url() {},
    entity() {},
    fn() {},
    type() {},
    typeValue() {},
    typeQuery() {},
    typeQueryValue() {},
    typeRequestBody() {},
    typeRequestBodyValue() {},
    typeResponseBody() {},
    typeResponseBodyValue() {},
  },
})
```

### Configuration Options

```ts
export interface Config {
  /**
   * The path to the OpenAPI/Swagger schema file.
   */
  input?: string
  /**
   * The path to the output directory.
   */
  output?: string
  /**
   * The base path of the API endpoints.
   */
  base?: string
  /**
   * The filename of the generated openapi types file.
   */
  typesFilename?: string
  /**
   * The transformer api options, used to override the default transformation rules.
   */
  transformer?: Partial<Transformer>
  /**
   * Whether to generate TypeScript code.
   */
  ts?: boolean
  /**
   * Whether to override the existing files, or an array of filenames to override.
   */
  overrides?: boolean | string[]
  /**
   * The preset ejs template to use.
   */
  preset?: Preset
  /**
   * The status code strategy to use. loose: all success status codes are 200, strict: use the openapi recommended success status codes.
   */
  statusCodeStrategy?: StatusCodeStrategy
  /**
   * The status codes to override the default status codes.
   */
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
```

### Template Variable Definitions

```ts
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
```

import { resolve } from 'path'

export const CWD = process.cwd()

export const CUSTOM_TEMPLATE_FILE = resolve(CWD, `./api-farmer.ejs`)

export const CLI_PACKAGE_JSON = resolve(__dirname, '../package.json')

export const SUPPORTED_HTTP_METHODS = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head']

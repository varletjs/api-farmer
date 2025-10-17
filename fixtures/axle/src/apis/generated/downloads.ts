import { api } from '@/request'
import { type paths } from './_types'

/**
 * Download a file
 * @description Streams a previously uploaded file as binary content.
 *
 * @url /downloads/{fileId}
 * @method GET
 */
export const apiGetDownload = api<ApiGetDownloadResponseBody, ApiGetDownloadQuery, ApiGetDownloadRequestBody>(
  '/downloads/:fileId',
  'get',
)

export type ApiGetDownload = paths['/downloads/{fileId}']['get']

export type ApiGetDownloadQuery = ApiGetDownload['parameters']['query']

export type ApiGetDownloadRequestBody = undefined

export type ApiGetDownloadResponseBody = ApiGetDownload['responses']['200']['content']['application/octet-stream']

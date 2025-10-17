import type { RequestConfig } from '@/request'
import { request } from '@/request'
import { type paths } from './_types'

/**
 * Download a file
 * @description Streams a previously uploaded file as binary content.
 *
 * @url /downloads/{fileId}
 * @method GET
 */
export const apiGetDownload = (config: RequestConfig<ApiGetDownloadQuery, ApiGetDownloadRequestBody> = {}) =>
  request<ApiGetDownloadResponseBody>({
    url: '/downloads/:fileId',
    method: 'get',
    ...config,
  })

export type ApiGetDownload = paths['/downloads/{fileId}']['get']

export type ApiGetDownloadQuery = ApiGetDownload['parameters']['query']

export type ApiGetDownloadRequestBody = undefined

export type ApiGetDownloadResponseBody = ApiGetDownload['responses']['200']['content']['application/octet-stream']

import type { RequestConfig } from '@/request'
import { request } from '@/request'
import { type paths } from './_types'

/**
 * Upload a file
 * @description Uploads a file and returns metadata about the stored item.
 *
 * @url /uploads
 * @method POST
 */
export const apiCreateUpload = (config: RequestConfig<ApiCreateUploadQuery, ApiCreateUploadRequestBody> = {}) =>
  request<ApiCreateUploadResponseBody>({
    url: '/uploads',
    method: 'post',
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config.headers,
    },
  })

export type ApiCreateUpload = paths['/uploads']['post']

export type ApiCreateUploadQuery = ApiCreateUpload['parameters']['query']

export type ApiCreateUploadRequestBody = ApiCreateUpload['requestBody']['content']['multipart/form-data']

export type ApiCreateUploadResponseBody = ApiCreateUpload['responses']['201']['content']['application/json']

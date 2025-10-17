import { api } from '@/request'
import { type paths } from './_types'

/**
 * Upload a file
 * @description Uploads a file and returns metadata about the stored item.
 *
 * @url /uploads
 * @method POST
 */
export const apiCreateUpload = api<ApiCreateUploadResponseBody, ApiCreateUploadRequestBody, ApiCreateUploadRequestBody>(
  '/uploads',
  'postMultipart',
)

export type ApiCreateUpload = paths['/uploads']['post']

export type ApiCreateUploadQuery = ApiCreateUpload['parameters']['query']

export type ApiCreateUploadRequestBody = ApiCreateUpload['requestBody']['content']['multipart/form-data']

export type ApiCreateUploadResponseBody = ApiCreateUpload['responses']['201']['content']['application/json']

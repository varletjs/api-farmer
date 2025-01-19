import { api } from '@/request'
import { type paths } from './_types'

export const apiGetUsers = api<ApiGetUsersResponseBody, ApiGetUsersQuery, ApiGetUsersRequestBody>('/users', 'get')

export const apiCreateUser = api<ApiCreateUserResponseBody, ApiCreateUserRequestBody, ApiCreateUserRequestBody>(
  '/users',
  'post',
)

export const apiGetUser = api<ApiGetUserResponseBody, ApiGetUserQuery, ApiGetUserRequestBody>('/users/:userId', 'get')

export const apiGetUserResources = api<
  ApiGetUserResourcesResponseBody,
  ApiGetUserResourcesQuery,
  ApiGetUserResourcesRequestBody
>('/users/:userId/resources', 'get')

export const apiCreateUserResource = api<
  ApiCreateUserResourceResponseBody,
  ApiCreateUserResourceRequestBody,
  ApiCreateUserResourceRequestBody
>('/users/:userId/resources', 'post')

export const apiGetUserResource = api<
  ApiGetUserResourceResponseBody,
  ApiGetUserResourceQuery,
  ApiGetUserResourceRequestBody
>('/users/:userId/resources/:resourceId', 'get')

export const apiDeleteUserResource = api<
  ApiDeleteUserResourceResponseBody,
  ApiDeleteUserResourceQuery,
  ApiDeleteUserResourceRequestBody
>('/users/:userId/resources/:resourceId', 'delete')

export type ApiGetUsers = paths['/users']['get']

export type ApiCreateUser = paths['/users']['post']

export type ApiGetUser = paths['/users/{userId}']['get']

export type ApiGetUserResources = paths['/users/{userId}/resources']['get']

export type ApiCreateUserResource = paths['/users/{userId}/resources']['post']

export type ApiGetUserResource = paths['/users/{userId}/resources/{resourceId}']['get']

export type ApiDeleteUserResource = paths['/users/{userId}/resources/{resourceId}']['delete']

export type ApiGetUsersQuery = ApiGetUsers['parameters']['query']

export type ApiCreateUserQuery = undefined

export type ApiGetUserQuery = undefined

export type ApiGetUserResourcesQuery = ApiGetUserResources['parameters']['query']

export type ApiCreateUserResourceQuery = undefined

export type ApiGetUserResourceQuery = undefined

export type ApiDeleteUserResourceQuery = undefined

export type ApiGetUsersRequestBody = undefined

export type ApiCreateUserRequestBody = ApiCreateUser['requestBody']['content']['application/json']

export type ApiGetUserRequestBody = undefined

export type ApiGetUserResourcesRequestBody = undefined

export type ApiCreateUserResourceRequestBody = ApiCreateUserResource['requestBody']['content']['application/json']

export type ApiGetUserResourceRequestBody = undefined

export type ApiDeleteUserResourceRequestBody = undefined

export type ApiGetUsersResponseBody = ApiGetUsers['responses']['200']['content']['application/json']

export type ApiCreateUserResponseBody = undefined

export type ApiGetUserResponseBody = ApiGetUser['responses']['200']['content']['application/json']

export type ApiGetUserResourcesResponseBody = ApiGetUserResources['responses']['200']['content']['application/json']

export type ApiCreateUserResourceResponseBody = undefined

export type ApiGetUserResourceResponseBody = ApiGetUserResource['responses']['200']['content']['application/json']

export type ApiDeleteUserResourceResponseBody = undefined

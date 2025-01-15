import { api } from '@/request'
import { type paths } from './types.generated'

export const apiGetUsers = api<Res<ApiGetUsersResponseBody>, ApiGetUsersRequestBody>('/users', 'get')

export const apiCreateUser = api<Res<ApiCreateUserResponseBody>, ApiCreateUserRequestBody>('/users', 'post')

export const apiGetUser = api<Res<ApiGetUserResponseBody>, ApiGetUserRequestBody>('/users/:userId', 'get')

export const apiGetUserResources = api<Res<ApiGetUserResourcesResponseBody>, ApiGetUserResourcesRequestBody>(
  '/users/:userId/resources',
  'get',
)

export const apiCreateUserResource = api<Res<ApiCreateUserResourceResponseBody>, ApiCreateUserResourceRequestBody>(
  '/users/:userId/resources',
  'post',
)

export const apiGetUserResource = api<Res<ApiGetUserResourceResponseBody>, ApiGetUserResourceRequestBody>(
  '/users/:userId/resources/:resourceId',
  'get',
)

export const apiDeleteUserResource = api<Res<ApiDeleteUserResourceResponseBody>, ApiDeleteUserResourceRequestBody>(
  '/users/:userId/resources/:resourceId',
  'delete',
)

export type ApiGetUsers = paths['/users']['get']

export type ApiCreateUser = paths['/users']['post']

export type ApiGetUser = paths['/users/{userId}']['get']

export type ApiGetUserResources = paths['/users/{userId}/resources']['get']

export type ApiCreateUserResource = paths['/users/{userId}/resources']['post']

export type ApiGetUserResource = paths['/users/{userId}/resources/{resourceId}']['get']

export type ApiDeleteUserResource = paths['/users/{userId}/resources/{resourceId}']['delete']

export type ApiGetUsersRequestBody = never

export type ApiCreateUserRequestBody = ApiCreateUser['requestBody']['content']['application/json']

export type ApiGetUserRequestBody = never

export type ApiGetUserResourcesRequestBody = never

export type ApiCreateUserResourceRequestBody = ApiCreateUserResource['requestBody']['content']['application/json']

export type ApiGetUserResourceRequestBody = never

export type ApiDeleteUserResourceRequestBody = never

export type ApiGetUsersResponseBody = ApiGetUsers['responses']['200']['content']['application/json']

export type ApiCreateUserResponseBody = never

export type ApiGetUserResponseBody = ApiGetUser['responses']['200']['content']['application/json']

export type ApiGetUserResourcesResponseBody = ApiGetUserResources['responses']['200']['content']['application/json']

export type ApiCreateUserResourceResponseBody = never

export type ApiGetUserResourceResponseBody = ApiGetUserResource['responses']['200']['content']['application/json']

export type ApiDeleteUserResourceResponseBody = never

import type { RequestConfig } from '@/request'
import { request } from '@/request'
import { type paths } from './_types'

export const apiGetUsers = (config: RequestConfig<ApiGetUsersRequestBody> = {}) =>
  request<any, ApiGetUsersResponseBody>({
    url: '/users',
    method: 'get',
    ...config,
  })

export const apiCreateUser = (config: RequestConfig<ApiCreateUserRequestBody> = {}) =>
  request<any, ApiCreateUserResponseBody>({
    url: '/users',
    method: 'post',
    ...config,
  })

export const apiGetUser = (config: RequestConfig<ApiGetUserRequestBody> = {}) =>
  request<any, ApiGetUserResponseBody>({
    url: '/users/:userId',
    method: 'get',
    ...config,
  })

export const apiGetUserResources = (config: RequestConfig<ApiGetUserResourcesRequestBody> = {}) =>
  request<any, ApiGetUserResourcesResponseBody>({
    url: '/users/:userId/resources',
    method: 'get',
    ...config,
  })

export const apiCreateUserResource = (config: RequestConfig<ApiCreateUserResourceRequestBody> = {}) =>
  request<any, ApiCreateUserResourceResponseBody>({
    url: '/users/:userId/resources',
    method: 'post',
    ...config,
  })

export const apiGetUserResource = (config: RequestConfig<ApiGetUserResourceRequestBody> = {}) =>
  request<any, ApiGetUserResourceResponseBody>({
    url: '/users/:userId/resources/:resourceId',
    method: 'get',
    ...config,
  })

export const apiDeleteUserResource = (config: RequestConfig<ApiDeleteUserResourceRequestBody> = {}) =>
  request<any, ApiDeleteUserResourceResponseBody>({
    url: '/users/:userId/resources/:resourceId',
    method: 'delete',
    ...config,
  })

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

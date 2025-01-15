import { type AxiosRequestConfig } from 'axios'
import { request } from '@/request'
import { type paths } from './types.generated'

export const apiGetUsers = (config: AxiosRequestConfig<ApiGetUsersRequestBody>) =>
  request<any, Res<ApiGetUsersResponseBody>>({
    url: '/users',
    method: 'get',
    ...config,
  })

export const apiCreateUser = (config: AxiosRequestConfig<ApiCreateUserRequestBody>) =>
  request<any, Res<ApiCreateUserResponseBody>>({
    url: '/users',
    method: 'post',
    ...config,
  })

export const apiGetUser = (config: AxiosRequestConfig<ApiGetUserRequestBody>) =>
  request<any, Res<ApiGetUserResponseBody>>({
    url: '/users/:userId',
    method: 'get',
    ...config,
  })

export const apiGetUserResources = (config: AxiosRequestConfig<ApiGetUserResourcesRequestBody>) =>
  request<any, Res<ApiGetUserResourcesResponseBody>>({
    url: '/users/:userId/resources',
    method: 'get',
    ...config,
  })

export const apiCreateUserResource = (config: AxiosRequestConfig<ApiCreateUserResourceRequestBody>) =>
  request<any, Res<ApiCreateUserResourceResponseBody>>({
    url: '/users/:userId/resources',
    method: 'post',
    ...config,
  })

export const apiGetUserResource = (config: AxiosRequestConfig<ApiGetUserResourceRequestBody>) =>
  request<any, Res<ApiGetUserResourceResponseBody>>({
    url: '/users/:userId/resources/:resourceId',
    method: 'get',
    ...config,
  })

export const apiDeleteUserResource = (config: AxiosRequestConfig<ApiDeleteUserResourceRequestBody>) =>
  request<any, Res<ApiDeleteUserResourceResponseBody>>({
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

export type ApiCreateUserQuery = never

export type ApiGetUserQuery = never

export type ApiGetUserResourcesQuery = ApiGetUserResources['parameters']['query']

export type ApiCreateUserResourceQuery = never

export type ApiGetUserResourceQuery = never

export type ApiDeleteUserResourceQuery = never

export type ApiGetUsersRequestBody = never

export type ApiCreateUserRequestBody = ApiCreateUser['requestBody']['content']['application/json']

export type ApiGetUserRequestBody = never

export type ApiGetUserResourcesRequestBody = never

export type ApiCreateUserResourceRequestBody = ApiCreateUserResource['requestBody']['content']['application/json']

export type ApiGetUserResourceRequestBody = never

export type ApiDeleteUserResourceRequestBody = never

export type ApiGetUsersResponseBody = ApiGetUsers['responses']['200']['content']['*/*']

export type ApiCreateUserResponseBody = never

export type ApiGetUserResponseBody = ApiGetUser['responses']['200']['content']['*/*']

export type ApiGetUserResourcesResponseBody = ApiGetUserResources['responses']['200']['content']['*/*']

export type ApiCreateUserResourceResponseBody = never

export type ApiGetUserResourceResponseBody = ApiGetUserResource['responses']['200']['content']['*/*']

export type ApiDeleteUserResourceResponseBody = never

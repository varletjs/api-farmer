import type { RequestConfig } from '@/request'
import { request } from '@/request'
import { type paths } from './_types'

/**
 * Get a list of users
 * @description Returns a list of users.
 *
 * @url /users
 * @method GET
 */
export const apiGetUsers = (config: RequestConfig<ApiGetUsersQuery, ApiGetUsersRequestBody> = {}) =>
  request<ApiGetUsersResponseBody>({
    url: '/users',
    method: 'get',
    ...config,
  })

/**
 * Create a new user
 * @description Adds a new user to the system.
 *
 * @url /users
 * @method POST
 */
export const apiCreateUser = (config: RequestConfig<ApiCreateUserQuery, ApiCreateUserRequestBody> = {}) =>
  request<ApiCreateUserResponseBody>({
    url: '/users',
    method: 'post',
    ...config,
  })

/**
 * Get user by ID
 * @description Retrieves a user by their ID.
 *
 * @url /users/{userId}
 * @method GET
 */
export const apiGetUser = (config: RequestConfig<ApiGetUserQuery, ApiGetUserRequestBody> = {}) =>
  request<ApiGetUserResponseBody>({
    url: '/users/:userId',
    method: 'get',
    ...config,
  })

/**
 * Get resources for a user
 * @description Retrieves a list of resources associated with the user.
 *
 * @url /users/{userId}/resources
 * @method GET
 */
export const apiGetUserResources = (
  config: RequestConfig<ApiGetUserResourcesQuery, ApiGetUserResourcesRequestBody> = {},
) =>
  request<ApiGetUserResourcesResponseBody>({
    url: '/users/:userId/resources',
    method: 'get',
    ...config,
  })

/**
 * Create a new resource for a user
 * @description Adds a new resource to the user's collection.
 *
 * @url /users/{userId}/resources
 * @method POST
 */
export const apiCreateUserResource = (
  config: RequestConfig<ApiCreateUserResourceQuery, ApiCreateUserResourceRequestBody> = {},
) =>
  request<ApiCreateUserResourceResponseBody>({
    url: '/users/:userId/resources',
    method: 'post',
    ...config,
  })

/**
 * Get a specific resource for a user
 * @description Retrieves details of a specific resource associated with the user.
 *
 * @url /users/{userId}/resources/{resourceId}
 * @method GET
 */
export const apiGetUserResource = (
  config: RequestConfig<ApiGetUserResourceQuery, ApiGetUserResourceRequestBody> = {},
) =>
  request<ApiGetUserResourceResponseBody>({
    url: '/users/:userId/resources/:resourceId',
    method: 'get',
    ...config,
  })

/**
 * Delete a specific resource for a user
 * @description Deletes a resource associated with the user.
 *
 * @url /users/{userId}/resources/{resourceId}
 * @method DELETE
 */
export const apiDeleteUserResource = (
  config: RequestConfig<ApiDeleteUserResourceQuery, ApiDeleteUserResourceRequestBody> = {},
) =>
  request<ApiDeleteUserResourceResponseBody>({
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

export type ApiCreateUserQuery = ApiCreateUser['parameters']['query']

export type ApiGetUserQuery = ApiGetUser['parameters']['query']

export type ApiGetUserResourcesQuery = ApiGetUserResources['parameters']['query']

export type ApiCreateUserResourceQuery = ApiCreateUserResource['parameters']['query']

export type ApiGetUserResourceQuery = ApiGetUserResource['parameters']['query']

export type ApiDeleteUserResourceQuery = ApiDeleteUserResource['parameters']['query']

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

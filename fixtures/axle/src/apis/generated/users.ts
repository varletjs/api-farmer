import { api } from '@/request'
import { type paths } from './_types'

/**
 * Get a list of users
 * @description Returns a list of users.
 *
 * @url /users
 * @method GET
 */
export const apiGetUsers = api<ApiGetUsersResponseBody, ApiGetUsersQuery, ApiGetUsersRequestBody>('/users', 'get')

/**
 * Create a new user
 * @description Adds a new user to the system.
 *
 * @url /users
 * @method POST
 */
export const apiCreateUser = api<ApiCreateUserResponseBody, ApiCreateUserRequestBody, ApiCreateUserRequestBody>(
  '/users',
  'post',
)

/**
 * Get user by ID
 * @description Retrieves a user by their ID.
 *
 * @url /users/{userId}
 * @method GET
 */
export const apiGetUser = api<ApiGetUserResponseBody, ApiGetUserQuery, ApiGetUserRequestBody>('/users/:userId', 'get')

/**
 * Get resources for a user
 * @description Retrieves a list of resources associated with the user.
 *
 * @url /users/{userId}/resources
 * @method GET
 */
export const apiGetUserResources = api<
  ApiGetUserResourcesResponseBody,
  ApiGetUserResourcesQuery,
  ApiGetUserResourcesRequestBody
>('/users/:userId/resources', 'get')

/**
 * Create a new resource for a user
 * @description Adds a new resource to the user's collection.
 *
 * @url /users/{userId}/resources
 * @method POST
 */
export const apiCreateUserResource = api<
  ApiCreateUserResourceResponseBody,
  ApiCreateUserResourceRequestBody,
  ApiCreateUserResourceRequestBody
>('/users/:userId/resources', 'post')

/**
 * Get a specific resource for a user
 * @description Retrieves details of a specific resource associated with the user.
 *
 * @url /users/{userId}/resources/{resourceId}
 * @method GET
 */
export const apiGetUserResource = api<
  ApiGetUserResourceResponseBody,
  ApiGetUserResourceQuery,
  ApiGetUserResourceRequestBody
>('/users/:userId/resources/:resourceId', 'get')

/**
 * Delete a specific resource for a user
 * @description Deletes a resource associated with the user.
 *
 * @url /users/{userId}/resources/{resourceId}
 * @method DELETE
 */
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

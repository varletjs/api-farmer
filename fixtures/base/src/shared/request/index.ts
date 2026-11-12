// https://github.com/varletjs/axle
import { createAxle } from '@varlet/axle'
import { createApi } from '@varlet/axle/api'
import { createUseAxle } from '@varlet/axle/use'

export const axle = createAxle({
  baseURL: '/api/v1',
})

export const useAxle = createUseAxle({
  axle,
})

export const api = createApi(axle, useAxle)

axle.useResponseInterceptor({
  onFulfilled(response) {
    return response.data
  },
})

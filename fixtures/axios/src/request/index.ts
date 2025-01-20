import axios, { AxiosRequestConfig } from 'axios'
import * as qs from 'qs-esm'

export const instance = axios.create()

instance.interceptors.response.use((response) => {
  return response.data
})

export type RequestConfig<P, D> = Omit<AxiosRequestConfig<D>, 'params'> & {
  params?: P
  pathParams?: Record<string, any>
}

export function request<R = any, P = Record<string, any>, D = any>(config: RequestConfig<P, D>) {
  const url = Object.entries(config.pathParams ?? {}).reduce(
    (url, [key, value]) => url.replace(`:${key}`, value),
    config.url ?? '',
  )

  const data = config.data
    ? config.headers?.['Content-Type'] === 'application/x-www-form-urlencoded'
      ? qs.stringify(config.data)
      : config.data
    : undefined

  return instance<any, R>({
    ...config,
    url,
    data,
  })
}

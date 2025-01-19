import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const instance = axios.create()

instance.interceptors.response.use((response) => {
  return response.data
})

export type RequestConfig<D> = AxiosRequestConfig<D> & {
  pathParams?: Record<string, any>
}

export function request<T = any, R = AxiosResponse<T>, D = any>(config: RequestConfig<D>) {
  const url = Object.entries(config.pathParams ?? {}).reduce(
    (url, [key, value]) => url.replace(`:${key}`, value),
    config.url ?? '',
  )

  return instance<T, R, D>({
    ...config,
    url,
  })
}

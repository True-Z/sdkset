import axios from 'axios'

import { init, wrapper } from '../helpers'
import { CreateConfig } from '../types'

/**
 * 返回一个基于`Promise`的[axios](https://www.axios-http.cn/)包装器对象。
 * 包装器对`axios.get`方法调用方式进行了改写。
 * 使用`TypeScript`时，可以通过传递泛型参数的形式控制请求`config`对象类型。
 *
 * @method
 * `axios.request(config)`
 * `axios.get(url, params, config)`
 * `axios.post(url, data, config)`
 * `axios.put(url, data, config)`
 * `axios.delete(url, config)`
 * `axios.patch(url, data, config)`
 * `axios.head(url, config)`
 * `axios.options(url, config)`
 *
 * @example
 * import { useAxios, useAxiosPack } from '@sdkset/axios'
 * import type { AxiosInterceptor, AxiosRequestConfig } from '@sdkset/axios'
 *
 * interface RequestConfig extends AxiosRequestConfig {
 *   [key: string]: unknown
 *   noNeedToken?: boolean
 *   ...
 * }
 *
 * const serve = useAxios<RequestConfig>({ option: { ... }, interceptor: { ... } })
 * await serve.get('url', params, config)
 * => response...
 *
 * @param config axios 实例
 */

export function useAxios<T, C extends CreateConfig = CreateConfig>(config: C) {
  const { self, interceptor, option } = init(config)

  if (self) {
    return axios
  }

  const axiosInstance = axios.create(option)
  axiosInstance.interceptors.request.use(interceptor.reqResolve, interceptor.reqReject, interceptor.reqOptions)
  axiosInstance.interceptors.response.use(interceptor.resResolve, interceptor.resReject, interceptor.resOptions)

  return wrapper<T>(axiosInstance)
}

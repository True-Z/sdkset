import { initAxios, WrapperAxios } from './helpers'

import type { CreateAxiosOption } from './types'
import type { AxiosInstance } from 'axios'

export * from './types'

export type { WrapperAxios } from './helpers'

/**
 * 返回一个[axios](https://www.axios-http.cn/)包装器对象。
 * 包装器对`axios.get`调用方式进行了简化。
 * 使用`TypeScript`时，可以通过传递泛型参数控制请求`config`对象类型。
 *
 * @example
 * import type { CreateAxiosDefaults } from 'axios'
 * import type { AxiosInterceptor } from '@sdkset/core'
 *
 * interface RequestConfig extends AxiosRequestConfig {
 *   custom: {
 *     noNeedToken?: boolean
 *     ...
 *   }
 * }
 *
 * const axiosInstance = axios.create({ ... })
 * const interceptor: AxiosInterceptor = { ... }
 * const axios = useAxios<RequestConfig>(axiosInstance, { interceptor })
 *
 * await axios.get('url', { ... }, config)
 * => response...
 *
 * @param axiosInstance axios 实例
 * @param [option] 包装器选项
 * @param [option.interceptor = {}] 拦截器对象
 *
 * @default
 * useAxios({
 *   config: {}, // 创建配置对象
 *   interceptor: {} // 拦截器对象
 * })
 */
export function useAxios<T>(axiosInstance: AxiosInstance, option?: CreateAxiosOption) {
  const { interceptor } = initAxios(option)

  axiosInstance.interceptors.request.use(
    interceptor.requestResolve,
    interceptor.requestReject,
    interceptor.requestOptions
  )
  axiosInstance.interceptors.response.use(
    interceptor.responseResolve,
    interceptor.responseReject,
    interceptor.responseOptions
  )

  return new WrapperAxios<T>(axiosInstance)
}

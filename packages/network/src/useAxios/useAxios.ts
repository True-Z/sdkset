import axios from 'axios'

import { initAxios, WrapperAxios } from './helpers'

import type { CreateAxiosOption } from './types'

/**
 * 返回一个[axios](https://www.axios-http.cn/)包装器对象。
 * 包装器对`axios.get`调用方式进行了简化。
 * 使用`TypeScript`时，可以通过传递泛型参数的形式控制请求`config`对象类型。
 *
 * @example
 * import type { AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
 * import type { AxiosInterceptor } from '@sdkset/axios'
 *
 * interface RequestConfig extends AxiosRequestConfig {
 *   noNeedToken?: boolean
 *   ...
 * }
 *
 * const config: CreateAxiosDefaults = { ... }
 * const interceptor: AxiosInterceptor = { ... }
 * const axios = useAxios<RequestConfig>({ option, interceptor })
 *
 * await axios.get('url', { ... }, config)
 * => response...
 *
 * @param option 包装器选项
 * @param option.config 创建配置对象（default：{}）
 * @param option.interceptor 拦截器对象（default：{}）
 */
export function useAxios<T>(option?: CreateAxiosOption) {
  const { config, interceptor } = initAxios(option)

  const axiosInstance = axios.create(config)
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

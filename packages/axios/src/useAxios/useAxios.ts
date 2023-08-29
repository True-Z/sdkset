import axios from 'axios'

import { AxiosWrapper, initAxios } from './helpers'

import type { CreateAxiosOption } from './types'

/**
 * 返回一个[axios](https://www.axios-http.cn/)包装器对象。
 * 包装器对`axios.get`调用方式进行了简化。
 * 使用`TypeScript`时，可以通过传递泛型参数的形式控制请求`config`对象类型。
 *
 * @method
 * `axios.self(): AxiosInstance`
 *
 * 返回`axios`实例自身。
 *
 * `axios.request(config): Promise<any>`
 *
 * 使用自定义配置发起`axios`请求。
 *
 * `axios.get(url, params, config): Promise<any>`
 *
 * 请求指定的资源。使用 GET 的请求应该只用于获取数据。
 *
 * `axios.post(url, data, config): Promise<any>`
 *
 * 发送数据给服务器。请求主体的类型由 Content-Type 首部指定。
 *
 * `axios.put(url, data, config): Promise<any>`
 *
 * 使用请求中的负载创建或者替换目标资源。
 *
 * `axios.delete(url, config): Promise<any>`
 *
 * 用于删除指定的资源。
 *
 * `axios.patch(url, data, config): Promise<any>`
 *
 * 用于对资源进行部分修改。
 *
 * `axios.head(url, config): Promise<any>`
 *
 * 请求资源的标头信息，并且这些标头与 GET 方法请求时返回的一致。
 *
 * `axios.options(url, config): Promise<any>`
 *
 * 用于获取目的资源所支持的通信选项。
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
  axiosInstance.interceptors.request.use(interceptor.reqResolve, interceptor.reqReject, interceptor.reqOptions)
  axiosInstance.interceptors.response.use(interceptor.resResolve, interceptor.resReject, interceptor.resOptions)
  return new AxiosWrapper<T>(axiosInstance)
}

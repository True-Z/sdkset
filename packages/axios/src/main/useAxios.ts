import type { RequestConfig } from '../types'
import type { Dictionary } from '@sdkset/types'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

/**
 * 返回一个基于`Promise`的[axios](https://www.axios-http.cn/)包装器对象，用于覆盖`axios.get`方法，并对请求`config`配置进行继承覆盖以便请求和使用自定义参数。
 *
 * @method
 * `axios.request(config)`
 *
 * Axios request 方法使用自定义配置发起 axios 请求
 *
 * `axios.get(url, params, config)`
 *
 * HTTP GET 方法请求指定的资源。使用 GET 的请求应该只用于获取数据
 *
 * `axios.post(url, data, config)`
 *
 * HTTP POST 方法 发送数据给服务器。请求主体的类型由 Content-Type 首部指定
 *
 * `axios.put(url, data, config)`
 *
 * HTTP PUT 请求方法使用请求中的负载创建或者替换目标资源
 *
 * `axios.delete(url, config)`
 *
 * HTTP DELETE 请求方法用于删除指定的资源
 *
 * `axios.patch(url, data, config)`
 *
 * 在 HTTP 协议中，请求方法 PATCH 用于对资源进行部分修改
 *
 * `axios.head(url, config)`
 *
 * HTTP HEAD 方法请求资源的标头信息，并且这些标头与 HTTP GET 方法请求时返回的一致
 *
 * `axios.options(url, config)`
 *
 * HTTP 的 OPTIONS 方法 用于获取目的资源所支持的通信选项
 *
 * @example
 * const serve = useAxios(AxiosInstance)
 * await serve.get('url', params, config)
 * => response...
 *
 * @param axiosInstance axios 实例
 */
export function useAxios(axiosInstance: AxiosInstance) {
  return {
    request: (config: RequestConfig) => axiosInstance(config as AxiosRequestConfig),
    get: (url: string, params?: Dictionary, config?: RequestConfig) =>
      axiosInstance({ url, params, ...config } as AxiosRequestConfig),
    post: (url: string, data?: unknown, config?: RequestConfig) =>
      axiosInstance.post(url, data, config as AxiosRequestConfig),
    put: (url: string, data?: unknown, config?: RequestConfig) =>
      axiosInstance.put(url, data, config as AxiosRequestConfig),
    delete: (url: string, config?: RequestConfig) => axiosInstance.delete(url, config as AxiosRequestConfig),
    patch: (url: string, data?: unknown, config?: RequestConfig) =>
      axiosInstance.patch(url, data, config as AxiosRequestConfig),
    head: (url: string, config?: RequestConfig) => axiosInstance.head(url, config as AxiosRequestConfig),
    options: (url: string, config?: RequestConfig) => axiosInstance.options(url, config as AxiosRequestConfig)
  }
}

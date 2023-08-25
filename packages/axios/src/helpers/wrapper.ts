import type { AxiosInstance, AxiosRequestConfig } from '../types'
import type { Dictionary } from '@sdkset/types'

/** 包装器对象 */
export class AxiosWrapper<T> {
  axios: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance
  }

  /** Axios request 方法使用自定义配置发起 axios 请求 */
  request(config: T): Promise<any> {
    return this.axios(config as AxiosRequestConfig)
  }

  /** HTTP GET 方法请求指定的资源。使用 GET 的请求应该只用于获取数据 */
  get(url: string, params?: Dictionary, config?: T): Promise<any> {
    return this.axios({ ...config, url, params })
  }

  /** HTTP POST 方法 发送数据给服务器。请求主体的类型由 Content-Type 首部指定 */
  post(url: string, data?: unknown, config?: T): Promise<any> {
    return this.axios.post(url, data, config as AxiosRequestConfig)
  }

  /** HTTP PUT 请求方法使用请求中的负载创建或者替换目标资源 */
  put(url: string, data?: unknown, config?: T): Promise<any> {
    return this.axios.put(url, data, config as AxiosRequestConfig)
  }

  /** HTTP DELETE 请求方法用于删除指定的资源 */
  delete(url: string, config?: T): Promise<any> {
    return this.axios.delete(url, config as AxiosRequestConfig)
  }

  patch(url: string, data?: unknown, config?: T): Promise<any> {
    return this.axios.patch(url, data, config as AxiosRequestConfig)
  }

  /** 在 HTTP 协议中，请求方法 PATCH 用于对资源进行部分修改 */
  head(url: string, config?: T): Promise<any> {
    return this.axios.head(url, config as AxiosRequestConfig)
  }

  /** HTTP 的 OPTIONS 方法 用于获取目的资源所支持的通信选项 */
  options(url: string, config?: T): Promise<any> {
    return this.axios.options(url, config as AxiosRequestConfig)
  }
}

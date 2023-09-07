import type { Dictionary } from '@sdkset/types'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

/** 包装器类。 */
export class WrapperAxios<T> {
  /** `axios`实例。 */
  get self() {
    return this.#axios
  }

  readonly #axios: AxiosInstance

  constructor(axios: AxiosInstance) {
    this.#axios = axios
  }

  /** 使用自定义配置发起`axios`请求。 */
  request(config: T): Promise<any> {
    return this.#axios(config as AxiosRequestConfig)
  }

  /** 请求指定的资源。使用`GET`的请求应该只用于获取数据。 */
  get(url: string, params?: Dictionary, config?: T): Promise<any> {
    return this.#axios({ ...config, url, params })
  }

  /** 发送数据给服务器。请求主体的类型由`Content-Type`首部指定。 */
  post(url: string, data?: unknown, config?: T): Promise<any> {
    return this.#axios.post(url, data, config as AxiosRequestConfig)
  }

  /** 使用请求中的负载创建或者替换目标资源。 */
  put(url: string, data?: unknown, config?: T): Promise<any> {
    return this.#axios.put(url, data, config as AxiosRequestConfig)
  }

  /** 用于删除指定的资源。 */
  delete(url: string, config?: T): Promise<any> {
    return this.#axios.delete(url, config as AxiosRequestConfig)
  }

  /** 用于对资源进行部分修改。 */
  patch(url: string, data?: unknown, config?: T): Promise<any> {
    return this.#axios.patch(url, data, config as AxiosRequestConfig)
  }

  /** 请求资源的标头信息，并且这些标头与`GET`方法请求时返回的一致。 */
  head(url: string, config?: T): Promise<any> {
    return this.#axios.head(url, config as AxiosRequestConfig)
  }

  /** 用于获取目的资源所支持的通信选项。 */
  options(url: string, config?: T): Promise<any> {
    return this.#axios.options(url, config as AxiosRequestConfig)
  }
}

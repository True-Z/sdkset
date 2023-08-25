import type { Dictionary } from '@sdkset/types'
import type { AxiosInterceptorOptions, AxiosResponse, CreateAxiosDefaults } from 'axios'

/** 创建配置对象 */
export interface CreateAxiosOption extends Dictionary {
  config?: CreateAxiosDefaults
  interceptor?: AxiosInterceptor
}

/** 拦截器对象 */
export interface AxiosInterceptor {
  /** 请求发送前，需要注意的是，`reqResolve`接收`config`对象为继承覆盖对象，便于 ts 拓展的同时，原有的拦截器函数已不满足约束`config`，暂行解决方案为（as any）  */
  reqResolve?: ((value: any) => any | Promise<any>) | null
  /** 请求失败时 */
  reqReject?: ((error: any) => any) | null
  /** 请求拦截配置 */
  reqOptions?: AxiosInterceptorOptions
  /** 响应接收后 */
  resResolve?: ((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>) | null
  /** 响应失败时 */
  resReject?: ((error: any) => any) | null
  /** 响应拦截配置 */
  resOptions?: AxiosInterceptorOptions
}

/** 包装器对象 */
export interface AxiosWrapper<T> {
  /** Axios request 方法使用自定义配置发起 axios 请求 */
  request: (config: T) => Promise<any>
  /** HTTP GET 方法请求指定的资源。使用 GET 的请求应该只用于获取数据 */
  get: (url: string, params?: Dictionary, config?: T) => Promise<any>
  /** HTTP POST 方法 发送数据给服务器。请求主体的类型由 Content-Type 首部指定 */
  post: (url: string, data?: unknown, config?: T) => Promise<any>
  /** HTTP PUT 请求方法使用请求中的负载创建或者替换目标资源 */
  put: (url: string, data?: unknown, config?: T) => Promise<any>
  /** HTTP DELETE 请求方法用于删除指定的资源 */
  delete: (url: string, config?: T) => Promise<any>
  /** 在 HTTP 协议中，请求方法 PATCH 用于对资源进行部分修改 */
  patch: (url: string, data?: unknown, config?: T) => Promise<any>
  /** HTTP HEAD 方法请求资源的标头信息，并且这些标头与 HTTP GET 方法请求时返回的一致 */
  head: (url: string, config?: T) => Promise<any>
  /** HTTP 的 OPTIONS 方法 用于获取目的资源所支持的通信选项 */
  options: (url: string, config?: T) => Promise<any>
}

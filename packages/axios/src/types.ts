import { Dictionary } from '@sdkset/types'
import { CreateAxiosDefaults } from 'axios'

import type { AxiosInterceptorOptions, AxiosResponse } from 'axios'

/** axios 拦截器配置对象 */
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

export interface AxiosWrapper<T> {
  request: (config: T) => Promise<any>
  delete: (url: string, config?: T) => Promise<any>
  get: (url: string, params?: Dictionary, config?: T) => Promise<any>
  head: (url: string, config?: T) => Promise<any>
  options: (url: string, config?: T) => Promise<any>
  patch: (url: string, data?: unknown, config?: T) => Promise<any>
  post: (url: string, data?: unknown, config?: T) => Promise<any>
  put: (url: string, data?: unknown, config?: T) => Promise<any>
}

export interface CreateConfig extends Dictionary {
  self: boolean
  option?: CreateAxiosDefaults
  interceptor?: AxiosInterceptor
}

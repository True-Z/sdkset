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

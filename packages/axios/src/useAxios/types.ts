import type { Dictionary } from '@sdkset/types'
import type { AxiosInterceptorOptions, AxiosResponse, CreateAxiosDefaults } from 'axios'

/** 包装器选项 */
export interface CreateAxiosOption extends Dictionary {
  /** 创建配置对象 */
  config?: CreateAxiosDefaults
  /** 拦截器对象 */
  interceptor?: AxiosInterceptor
}

/** 拦截器对象 */
export interface AxiosInterceptor {
  /** 请求发送前 */
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

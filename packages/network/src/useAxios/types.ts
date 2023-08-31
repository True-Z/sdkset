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
  requestResolve?: ((value: any) => any | Promise<any>) | null
  /** 请求失败时 */
  requestReject?: ((error: any) => any) | null
  /** 请求拦截配置 */
  requestOptions?: AxiosInterceptorOptions
  /** 响应接收后 */
  responseResolve?: ((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>) | null
  /** 响应失败时 */
  responseReject?: ((error: any) => any) | null
  /** 响应拦截配置 */
  responseOptions?: AxiosInterceptorOptions
}

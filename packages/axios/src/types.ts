import type { AxiosInterceptorOptions, AxiosRequestConfig, AxiosResponse } from 'axios'

/** axios 配置对象（覆盖继承） */
export interface RequestConfig extends AxiosRequestConfig {
  [key: string]: unknown
}

/** axios 拦截器配置对象（覆盖继承） */
export interface AxiosInterceptor {
  reqResolve?: ((value: RequestConfig) => RequestConfig | Promise<RequestConfig>) | null
  reqReject?: ((error: any) => any) | null
  reqOptions?: AxiosInterceptorOptions
  resResolve?: ((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>) | null
  resReject?: ((error: any) => any) | null
  resOptions?: AxiosInterceptorOptions
}

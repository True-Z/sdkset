import type { AxiosRequestConfig } from 'axios'

/** axios 配置对象（覆盖继承） */
export interface RequestConfig extends AxiosRequestConfig {
  [key: string]: unknown
}

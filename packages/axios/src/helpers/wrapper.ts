import { Dictionary } from '@sdkset/types'
import { AxiosInstance, AxiosRequestConfig } from 'axios'

export function wrapper<T>(axiosInstance: AxiosInstance) {
  return {
    request: (config: T): Promise<any> => axiosInstance(config as AxiosRequestConfig),

    get: (url: string, params?: Dictionary, config?: T): Promise<any> => axiosInstance({ ...config, url, params }),

    post: (url: string, data?: unknown, config?: T): Promise<any> =>
      axiosInstance.post(url, data, config as AxiosRequestConfig),

    put: (url: string, data?: unknown, config?: T): Promise<any> =>
      axiosInstance.put(url, data, config as AxiosRequestConfig),

    delete: (url: string, config?: T): Promise<any> => axiosInstance.delete(url, config as AxiosRequestConfig),

    patch: (url: string, data?: unknown, config?: T): Promise<any> =>
      axiosInstance.patch(url, data, config as AxiosRequestConfig),

    head: (url: string, config?: T): Promise<any> => axiosInstance.head(url, config as AxiosRequestConfig),

    options: (url: string, config?: T): Promise<any> => axiosInstance.options(url, config as AxiosRequestConfig)
  }
}

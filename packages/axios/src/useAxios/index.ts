import axios from 'axios'

import { init } from '../helpers'
import { CreateAxiosOption } from '../types'

/**
 * 返回一个基于`Promise`的[axios](https://www.axios-http.cn/)包装器对象。
 * 包装器对`axios.get`方法调用方式进行了改写。
 * 使用`TypeScript`时，可以通过传递泛型参数的形式控制请求`config`对象类型。
 *
 * @method
 * `axios.request(config)`
 *
 * `axios.get(url, params, config)`
 *
 * `axios.post(url, data, config)`
 *
 * `axios.put(url, data, config)`
 *
 * `axios.delete(url, config)`
 *
 * `axios.patch(url, data, config)`
 *
 * `axios.head(url, config)`
 *
 * `axios.options(url, config)`
 *
 * @example
 * import { useAxios } from '@sdkset/axios'
 *
 * import type { AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
 * import type { AxiosInterceptor } from '@sdkset/axios'
 *
 * interface RequestConfig extends AxiosRequestConfig {
 *   noNeedToken?: boolean
 *   ...
 * }
 *
 * const config: CreateAxiosDefaults = { ... }
 * const interceptor: AxiosInterceptor = { ... }
 * const serve = useAxios<RequestConfig>({ option, interceptor })
 * await serve.get('url', params, config)
 * => response...
 *
 * @param option 包装器选项
 * @param option.config 创建配置对象
 * @param option.interceptor 拦截器对象
 */

export function useAxios<T, C extends CreateAxiosOption>(option: C) {
  const { interceptor, config } = init(option)

  const axiosInstance = axios.create(config)
  axiosInstance.interceptors.request.use(interceptor.reqResolve, interceptor.reqReject, interceptor.reqOptions)
  axiosInstance.interceptors.response.use(interceptor.resResolve, interceptor.resReject, interceptor.resOptions)
  return new Demo()
}

class Demo {
  constructor() {
    console.log('🚀 ~~ path: index.ts ~ line: 61 : ', 1)
  }

  add() {
    console.log('🚀 ~~ path: index.ts ~ line: 64 : ', 'add')
  }
}

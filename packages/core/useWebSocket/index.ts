import { useObserver } from '@sdkset/mode'

import { initWebSocket, WrapperWebSocket } from './helpers'

import type { CreateWebSocketOption } from './types'

export * from './types'

export type { WrapperWebSocket } from './helpers'

/**
 * 返回一个基于`Promise`的[webSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)包装器对象。
 *
 * @example
 * import { useWebSocket } from '@sdkset/core'
 *
 * import type { CreateWebSocketOption } from '@sdkset/core'
 *
 * const option: CreateWebSocketOption = { ... }
 * const ws = await useWebSocket('ws://124.222.224.186:8800', option)
 *
 * ws.send('data')
 * ...
 * ws.close()
 *
 * @param url 请求地址
 * @param [option] 包装器选项
 * @param [option.params] 请求参数
 * @param [option.protocols] 协议字符串 or 包含协议字符串的数组
 * @param [option.heartbeat = true] 心跳配置
 * @param [option.autoReconnect = false] 重连配置
 * @param [option.interceptor] 拦截器对象
 *
 * @default
 * useWebSocket(undefined, {
 *   params: undefined, // 请求参数
 *   protocols: undefined, // 协议字符串 or 包含协议字符串的数组
 *   heartbeat: true, // 心跳配置
 *   autoReconnect: false, // 重连配置
 *   interceptor: {}, // 拦截器对象
 * })
 *
 * // 心跳（默认开启），布尔值控制开启/关闭，也可自行配置（以下为默认配置）：
 * heartbeat: {
 *   message: 'ping', // 心跳间隔消息
 *   interval: 1000 // 心跳间隔毫秒数
 * }
 *
 * // 重连（默认关闭），布尔值控制开启/关闭，也可自行配置（以下为默认配置）：
 * heartbeat: {
 *   retries: 3, // 最大重连次数
 *   delay: 1000 // 重连间隔毫秒数
 * }
 *
 * // 拦截器对象
 * interceptor: {
 *   error: () => {} // 连接发生错误时
 *   message: () => {} // 接收到新消息时
 *   close: () => {} // 连接关闭时
 *   fail: () => {} // 重连失败时
 * }
 */
export async function useWebSocket(url: string, option?: CreateWebSocketOption): Promise<WrapperWebSocket> {
  return new Promise((resolve, reject) => {
    if (!window.WebSocket) {
      reject(
        new TypeError(
          'The existing browser does not support "WebSocket", it is recommended to replace or upgrade the browser'
        )
      )
    }

    const observer = useObserver()
    const ws = new WrapperWebSocket(url, initWebSocket(option), observer)
    observer.on('open', () => {
      resolve(ws)
    })
  })
}

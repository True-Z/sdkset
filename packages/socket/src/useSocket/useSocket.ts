import { useObserver } from '@sdkset/mode'

import { WrapperSocket } from './helpers'
import { initSocket } from './helpers/initSocket'

import type { CreateSocketOption } from './types'

/**
 * 返回一个基于`Promise`的[webSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)包装器对象。
 *
 * @example
 * const ws = await useSocket({
 *  url: 'ws://121.40.165.18:8800', // 请求 url
 *  heartCheckData: '', // 可选。心跳间隔数据
 *  heartCheckTimeout: 30 * 1000, // 可选。心跳间隔毫秒数
 *  maxReconnectNum: 3, // 可选。最大重连次数
 *  reconnectTimeout:: 5 * 1000, // 可选。重连间隔时间毫秒数
 *  params: { ... }, // 可选。请求参数
 *  protocols: '' || ['', ...] // 可选。协议字符串 or 包含协议字符串的数组
 * }, {
 *  // 可选。连接建立时触发,这意味着当前连接已经准备好发送和接受数据
 *  open(e) {},
 *  // 可选。连接发生错误而被关闭时触发,这意味着当前连接由于一些错误事件的发生 (例如无法发送一些数据) 而被关闭
 *  error(e) {},
 *  // 可选。接收到新消息时触发
 *  message(e) {},
 *  // 可选。连接关闭时触发
 *  close(e) {},
 *  // 可选。重连时触发，这意味着用于期望收到状态码时连接非正常关闭（连接断开）
 *  recount(e) { ws = e },
 *  // 可选。重连失败时触发，这意味着需要特殊处理才能重新建立连接
 *  fail() {},
 * })
 *
 * @method
 * `ws.send(data: string | Blob | ArrayBufferLike | ArrayBufferView): void`
 *
 * 将需要通过 WebSocket 链接传输至服务器的数据排入队列，并根据所需要传输的 data bytes 的大小来增加 bufferedAmount的值。若数据无法传输（例如数据需要缓存而缓冲区已满）时，套接字会自行关闭。
 *
 * `ws.close(code?: number | undefined, reason?: string | undefined): void`
 *
 * 关闭 WebSocket 连接或连接尝试（如果有的话）。如果连接已经关闭，则此方法不执行任何操作。
 *
 * @param option 请求配置对象
 */
export async function useSocket(option?: CreateSocketOption): Promise<WrapperSocket> {
  const { config, interceptor } = initSocket(option)

  return new Promise((resolve, reject) => {
    if (!window.WebSocket) {
      reject(
        new TypeError(
          'The existing browser does not support "WebSocket", it is recommended to replace or upgrade the browser'
        )
      )
    }

    const observer = useObserver()
    const ws = new WrapperSocket(config, observer)

    ws.mountInterceptors(interceptor)

    ws.interceptors.use(interceptor)
    observer.depend('load', () => {
      resolve(ws)
    })
  })
}

async function demo() {
  useSocket({
    config: {
      url: 'ws://124.222.224.186:8800',
      heartbeatInterval: 5 * 1000
    },
    interceptor: {
      open(e) {
        console.log('🚀 ~~ path: useSocket.ts ~ line: 75 : ', e, '已连接')
      },
      message(e) {
        console.log('🚀 ~~ path: useSocket.ts ~ line: 78 : ', e, '接收数据')
      },
      close(e) {
        console.log('🚀 ~~ path: useSocket.ts ~ line: 76 : ', e, '已关闭')
      },
      error(e) {
        console.log('🚀 ~~ path: useSocket.ts ~ line: 78 : ', e, '错误')
      },
      reconnect(e) {
        console.log('🚀 ~~ path: useSocket.ts ~ line: 76 : ', e, '重连')
      },
      fail() {
        console.log('🚀 ~~ path: useSocket.ts ~ line: 76 : ', '连接失败')
      }
    }
  }).then((ws) => {
    console.log('🚀 ~~ path: useSocket.ts ~ line: 95 : ', ws)
    window.ws = ws
  })
}
demo()

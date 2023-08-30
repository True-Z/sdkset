import * as utils from '../utils'

import type { CreateSocketDefaults, SocketInterceptor } from '../types'
import type { ObserverWrapper } from '@sdkset/mode'

// 支持的连接器类型
const SOCKET_METHOD_WHITELIST = ['load', 'open', 'message', 'error', 'close', 'reconnect', 'fail']
// 用于期望收到状态码时连接非正常关闭
const CLOSE_ABNORMAL = 1006

/** 包装器类。 */
export class WrapperSocket {
  readonly #config: Required<CreateSocketDefaults>

  readonly #observer: ObserverWrapper

  readonly #queryUrl: string

  readonly #protocols: string | string[]

  #ws: WebSocket

  #reconnectCount = 0

  #heartbeatTimer: NodeJS.Timer | undefined

  constructor(config: Required<CreateSocketDefaults>, observer: ObserverWrapper) {
    const { url, params, protocols } = config

    this.#config = config
    this.#observer = observer
    this.#queryUrl = utils.buildUrl(url, params)
    this.#protocols = protocols
    this.#ws = new WebSocket(this.#queryUrl, this.#protocols)
  }

  interceptors = {
    use: (interceptors: SocketInterceptor) => {
      this.#initInterceptors(interceptors)
      this.mountInterceptors()
    },

    clear: () => {
      this.#observer.cancel('', true)
    }
  }

  /**
   * 初始化`Handle`，订阅特定事件，处理边界情况。
   */
  #initInterceptors(interceptors: SocketInterceptor = {}) {
    const keys = Object.keys(interceptors)
    for (let i = 0, { length } = keys; i < length; i++) {
      const currKey = keys[i]
      const curInterceptors = interceptors[currKey]
      if (!SOCKET_METHOD_WHITELIST.includes(currKey)) {
        console.error(new TypeError(`Unknown interceptor type ${currKey}`))
        return
      }
      if (typeof curInterceptors !== 'function') {
        console.error(new TypeError(`Interceptor of type ${currKey} needs to be a function`))
        return
      }
      this.#observer.depend(currKey, curInterceptors)
    }
  }

  unmountInterceptors() {
    this.#observer.cancel('', true)
  }

  /**
   * 初始化`Socket`，发布特定事件，处理边界情况。
   */
  mountInterceptors(interceptors: SocketInterceptor = {}) {
    this.#initInterceptors(interceptors)

    this.#ws.addEventListener('open', (e) => {
      this.#observer.notify('load')
      this.#observer.notify('open', e)
      this.#reconnectCount = 0
      this.#heartbeatClear()
      this.#heartbeatStart()
    })

    this.#ws.addEventListener('message', (e) => {
      if (e.data instanceof Blob) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(e.data)
        reader.onload = (ev) => {
          if (ev.target?.readyState === FileReader.DONE) {
            this.#observer.notify('message', ev.target.result)
          }
        }
      } else {
        try {
          this.#observer.notify('message', JSON.parse(e.data))
        } catch {
          this.#observer.notify('message', e.data)
        }
      }
    })

    this.#ws.addEventListener('error', (e) => {
      this.#observer.notify('error', e)
    })

    this.#ws.addEventListener('close', async (e) => {
      this.#observer.notify('close', e)
      if (e.code === CLOSE_ABNORMAL) {
        if (this.#reconnectCount < this.#config.maxReconnectNum) {
          await utils.waitFor(this.#config.reconnectInterval)
          this.#reconnectCount++
          this.#observer.notify('reconnect', { reconnectCount: this.#reconnectCount })
          this.#ws = new WebSocket(this.#queryUrl, this.#protocols)
          this.mountInterceptors()
        } else {
          this.#observer.notify('fail')
        }
      }
    })
  }

  /**
   * 开启`Socket`心跳定时器。
   */
  #heartbeatStart() {
    this.#heartbeatTimer = setInterval(() => {
      if (this.#ws.readyState === this.#ws.OPEN) {
        this.send(this.#config.heartbeatData)
      } else {
        this.#heartbeatClear()
      }
    }, this.#config.heartbeatInterval)
  }

  /**
   * 清除`Socket`心跳定时器。
   */
  #heartbeatClear() {
    clearInterval(this.#heartbeatTimer)
  }

  /**
   * 将需要通过 WebSocket 链接传输至服务器的数据排入队列，并根据所需要传输的 data bytes 的大小来增加 bufferedAmount的值。
   * 若数据无法传输（例如数据需要缓存而缓冲区已满）时，套接字会自行关闭。
   *
   * @example
   * var observer = new Observer()
   * observer.observerend('open', func)
   * observer.notify('open')
   * => func()
   *
   * @param data 用于传输至服务器的数据。它必须是以下类型之一：
   * [USVString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
   * 文本字符串。字符串将以 UTF-8 格式添加到缓冲区，并且 bufferedAmount 将加上该字符串以 UTF-8 格式编码时的字节数的值。
   * [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
   * 可以使用一有类型的数组对象发送底层二进制数据；其二进制数据内存将被缓存于缓冲区，bufferedAmount 将加上所需字节数的值。
   * [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
   * Blob 类型将队列 blob 中的原始数据以二进制中传输。 bufferedAmount 将加上原始数据的字节数的值。
   * [ArrayBufferView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
   * 可以以二进制帧的形式发送任何 JavaScript 类数组对象 ；其二进制数据内容将被队列于缓冲区中。值 bufferedAmount 将加上必要字节数的值。
   */
  send(data: unknown) {
    if (utils.isArrayBuffer(data) || utils.isBlob(data) || utils.isTypedArray(data)) {
      this.#ws.send(data)
      return
    }
    this.#ws.send(JSON.stringify(data))
  }

  /**
   * 关闭 WebSocket 连接或连接尝试（如果有的话）。如果连接已经关闭，则此方法不执行任何操作。
   *
   * @example
   * ws.close()
   * => close Socket
   *
   * @param code 一个数字状态码，它解释了连接关闭的原因。如果没有传这个参数，默认使用 1005。
   * [CloseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent)允许的状态码见
   * [状态码列表](https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent#status_codes) 。
   * @param reason 一个人类可读的字符串，它解释了连接关闭的原因。这个 UTF-8 编码的字符串不能超过 123 个字节。
   */
  close(code?: number, reason?: string) {
    this.#ws.close(code, reason)
  }
}

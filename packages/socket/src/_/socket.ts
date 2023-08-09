import * as core from '@sdkset/core'

import type { SocketHandle, SocketQuery } from '../types'
import type { Observer } from '@sdkset/mode'

/** Socket 配置对象 */
export interface SocketConfig extends SocketQuery {
  /** 发布/订阅对象 */
  observer: Observer
  /** 拦截器对象 */
  handle?: Partial<SocketHandle>
}

const SOCKET_METHOD_NAME = ['load', 'open', 'message', 'error', 'close', 'reconnect', 'fail'] // 支持的 handle 方法
const SOCKET_CHECK_TIMEOUT = 55 * 1000 // 默认心跳间隔毫秒数
const SOCKET_CHECK_COUNT = 3 // 默认重连次数
const SOCKET_RECONNECT_TIMEOUT = 5 * 1000 // 重连间隔时间毫秒数
const CLOSE_ABNORMAL = 1006 // 用于期望收到状态码时连接非正常关闭

/**
 * `WebSocket`包装器类。
 *
 * @example
 * var ws = new Socket(config, handle)
 * ws.send()
 * => send Data
 * ws.close()
 * => close Socket
 */
export class Socket {
  _config: SocketConfig

  _observer: Observer

  _ws: WebSocket

  _heartCheckInterval: NodeJS.Timer | undefined

  _heartCheckTimeout: number

  _heartCheckData: unknown

  _reconnectCount: number

  _reconnectTimeout: number

  _maxReconnectNum: number

  constructor(config: SocketConfig, reconnectCount = 0) {
    const {
      url,
      protocols,
      observer,
      handle,
      params,
      heartCheckTimeout,
      heartCheckData,
      maxReconnectNum,
      reconnectTimeout
    } = config

    const queryUrl = `${url}?${core.toParams(params)}`

    this._config = config
    this._ws = new WebSocket(queryUrl, protocols)
    this._heartCheckTimeout = heartCheckTimeout ?? SOCKET_CHECK_TIMEOUT
    this._heartCheckData = heartCheckData ?? ''
    this._reconnectCount = reconnectCount
    this._reconnectTimeout = reconnectTimeout ?? SOCKET_RECONNECT_TIMEOUT
    this._maxReconnectNum = maxReconnectNum ?? SOCKET_CHECK_COUNT
    this._observer = observer
    this._initHandle(handle)
    this._initSocket()
  }

  /**
   * 初始化`Handle`，订阅特定事件，处理边界情况。
   */
  _initHandle(handle: SocketConfig['handle'] = {}) {
    const _keys = core.keys(handle)
    for (let i = 0, { length } = _keys; i < length; i++) {
      const currKey = _keys[i]
      const currHandle = handle[currKey]
      if (!core.isFunction(currHandle)) {
        return console.error('"Handle" not a function, We need a function here')
      }
      if (!SOCKET_METHOD_NAME.includes(currKey)) {
        return console.error('"Handle Type" not of the specified type')
      }
      this._observer.depend(currKey, currHandle)
    }
  }

  /**
   * 初始化`Socket`，发布特定事件，处理边界情况。
   */
  _initSocket() {
    this._ws.addEventListener('open', (e) => {
      this._observer.notify('open', e)
      this._observer.notify('load')
      this._resetCheckStart()
      this._reconnectCount = 0
    })
    this._ws.addEventListener('message', (e) => {
      if (e.data instanceof Blob) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(e.data)
        reader.onload = (ev) => {
          if (ev.target?.readyState === FileReader.DONE) {
            this._observer.notify('message', ev.target.result)
          }
        }
      } else {
        try {
          this._observer.notify('message', JSON.parse(e.data))
        } catch (error) {
          console.error(error)
        }
      }
    })
    this._ws.addEventListener('error', (e) => {
      this._observer.notify('error', e)
    })
    this._ws.addEventListener('close', async (e) => {
      this._observer.notify('close', e)
      if (e.code === CLOSE_ABNORMAL) {
        if (this._reconnectCount < this._maxReconnectNum) {
          await core.wait(this._reconnectTimeout)
          this._reconnectCount++
          const _reconnectSocket = new Socket(this._config, this._reconnectCount)
          this._observer.notify('reconnect', _reconnectSocket)
        } else {
          this._observer.notify('fail')
        }
      }
    })
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
    if (core.isArrayBuffer(data) || core.isBlob(data) || core.isTypedArray(data)) {
      this._ws.send(data)
    }
    this._ws.send(JSON.stringify(data))
  }

  /**
   * 关闭 WebSocket 连接或连接尝试（如果有的话）。如果连接已经关闭，则此方法不执行任何操作。
   *
   * @example
   * ws.close()
   * => close Socket
   *
   * @param code 一个数字状态码，它解释了连接关闭的原因。如果没有传这个参数，默认使用 1005。
   * [CloseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent)的允许的状态码见
   * [状态码列表](https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent#status_codes) 。
   * @param reason 一个人类可读的字符串，它解释了连接关闭的原因。这个 UTF-8 编码的字符串不能超过 123 个字节。
   */
  close(code?: number, reason?: string) {
    this._ws.close(code, reason)
  }

  /**
   * 开启`Socket`心跳定时器。
   */
  _heartCheckStart() {
    this._heartCheckInterval = setInterval(() => {
      if (this._ws.readyState === this._ws.OPEN) {
        this.send(this._heartCheckData)
      } else {
        this._clearCheckStart()
      }
    }, this._heartCheckTimeout)
  }

  /**
   * 清除`Socket`心跳定时器。
   */
  _clearCheckStart() {
    clearInterval(this._heartCheckInterval)
  }

  /**
   * 重置`Socket`心跳定时器。
   */
  _resetCheckStart() {
    clearInterval(this._heartCheckInterval)
    this._heartCheckStart()
  }
}

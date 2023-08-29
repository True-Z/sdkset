import type { Collection, Dictionary } from '@sdkset/types'

export interface CreateSocketOption extends Dictionary {
  config: CreateSocketDefaults
  interceptor?: SocketInterceptor
}

export interface RequiredSocketOption {
  config: Required<CreateSocketOption['config']>
  interceptor: SocketInterceptor
}

/** 请求参数 */
export interface CreateSocketDefaults extends Dictionary {
  /** 请求 url */
  url: string
  /** 请求参数 */
  params?: Collection
  /** 协议字符串 or 包含协议字符串的数组 */
  protocols?: string | string[]
  /** 心跳间隔数据 */
  checkHeartbeatData?: unknown
  /** 心跳间隔毫秒数 */
  checkHeartbeatTime?: number
  /** 最大重连次数 */
  maxReconnectNum?: number
  /** 重连间隔毫秒数 */
  checkReconnectTime?: number
}

/** 拦截器对象 */
export interface SocketInterceptor extends Dictionary {
  /** 连接建立时触发,这意味着当前连接已经准备好发送和接受数据 */
  open?: (event: unknown) => void
  /** 连接发生错误而被关闭时触发,这意味着当前连接由于一些错误事件的发生 (例如无法发送一些数据) 而被关闭 */
  error?: (event: unknown) => void
  /** 接收到新消息时触发 */
  message?: (event: unknown) => void
  /** 连接关闭时触发 */
  close?: (event: unknown) => void
  /** 重连时触发，这意味着用于期望收到状态码时连接非正常关闭（连接断开） */
  reconnect?: (event: unknown) => void
  /** 重连失败时触发，这意味着需要特殊处理才能重新建立连接 */
  fail?: () => void
}

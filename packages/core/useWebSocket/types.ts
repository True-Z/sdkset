import type { Collection, Dictionary } from '@sdkset/types'

/** 包装器选项。 */
export interface CreateWebSocketOption extends Dictionary {
  /** 请求参数。 */
  params?: Collection
  /** 协议字符串 or 包含协议字符串的数组。 */
  protocols?: string | string[]
  /** 心跳配置。 */
  heartbeat?:
    | boolean
    | {
        /** 心跳间隔消息。 */
        message?: string | ArrayBuffer | Blob
        /** 心跳间隔毫秒数。 */
        interval?: number
      }
  /** 重连配置。 */
  autoReconnect?:
    | boolean
    | {
        /** 最大重连次数。 */
        retries?: number
        /** 重连间隔毫秒数。 */
        delay?: number
      }
  /** 拦截器对象。 */
  interceptor?: WebSocketInterceptor
}

/** 包装器选项（内部）。 */
export interface RequiredWebSocketOption extends Required<CreateWebSocketOption>, Dictionary {
  /** 心跳配置。 */
  heartbeat: {
    /** 是否启用。 */
    enable: boolean
    /** 心跳间隔消息。 */
    message: string | ArrayBuffer | Blob
    /** 心跳间隔毫秒数。 */
    interval: number
  }
  /** 重连配置。 */
  autoReconnect: {
    /** 是否启用。 */
    enable: boolean
    /** 最大重连次数。 */
    retries: number
    /** 重连间隔毫秒数。 */
    delay: number
  }
}

/** 拦截器对象。 */
export interface WebSocketInterceptor extends Dictionary {
  /** 连接发生错误而被关闭时触发,这意味着当前连接由于一些错误事件的发生 (例如无法发送一些数据) 而被关闭。 */
  error?: (ws: WebSocket, event: Event) => void
  /** 接收到新消息时触发。 */
  message?: (ws: WebSocket, event: MessageEvent) => void
  /** 连接关闭时触发。 */
  close?: (ws: WebSocket, event: CloseEvent) => void
  /** 重连失败时触发。 */
  fail?: () => void
}

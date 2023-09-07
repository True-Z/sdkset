import type { CreateWebSocketOption, RequiredWebSocketOption } from '../types'

const defaultOption: Required<CreateWebSocketOption> = {
  heartbeatData: 'heartbeat',
  heartbeatInterval: 30 * 1000,
  maxReconnectNum: 3,
  reconnectInterval: 5 * 1000
}

/** 选项初始化 */
export function initWebSocket<C extends CreateWebSocketOption>(customOption?: C) {
  if (customOption == null) {
    return defaultOption as RequiredWebSocketOption
  }

  return {
    config: { ...defaultOption.config, ...customOption.config },
    interceptor: { ...defaultOption.interceptor, ...customOption.interceptor }
  } as RequiredWebSocketOption
}

import { isBoolean } from '../utils'

import type { CreateWebSocketOption, RequiredWebSocketOption } from '../types'

const defaultOption = {
  heartbeat: {
    enable: true,
    message: 'ping',
    interval: 1000
  },
  autoReconnect: {
    enable: false,
    retries: 3,
    delay: 1000
  },
  interceptor: {}
} as RequiredWebSocketOption

/** 选项初始化。 */
export function initWebSocket<C extends CreateWebSocketOption>(customOption?: C) {
  if (customOption == null) {
    return defaultOption
  }

  const conversOption = {} as RequiredWebSocketOption
  const { heartbeat, autoReconnect } = customOption
  if (isBoolean(heartbeat)) {
    if (!heartbeat) {
      defaultOption.heartbeat.enable = false
    }
    conversOption.heartbeat = defaultOption.heartbeat
  }
  if (isBoolean(autoReconnect)) {
    if (autoReconnect) {
      defaultOption.autoReconnect.enable = true
    }
    conversOption.autoReconnect = defaultOption.autoReconnect
  }

  return { ...defaultOption, ...customOption, ...conversOption }
}

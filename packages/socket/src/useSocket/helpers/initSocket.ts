import type { CreateSocketOption, RequiredSocketOption } from '../types'

const defaultOption: Required<CreateSocketOption> = {
  config: {
    url: '',
    checkHeartbeatData: 'heartbeat',
    checkHeartbeatTime: 30 * 1000,
    maxReconnectNum: 3,
    checkReconnectTime: 5 * 1000
  },
  interceptor: {}
}

/** 选项初始化 */
export function initSocket<C extends CreateSocketOption>(customOption?: C) {
  if (customOption == null) {
    return defaultOption as RequiredSocketOption
  }

  return {
    config: { ...defaultOption.config, ...customOption.config },
    interceptor: { ...defaultOption.interceptor, ...customOption.interceptor }
  } as RequiredSocketOption
}

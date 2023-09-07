import type { CreateDayjsOption } from '../types'

const defaultOption = {
  convers: 'dayjs',
  template: 'YYYY-MM-DD HH:mm:ss'
} as Required<CreateDayjsOption>

/** 选项初始化 */
export function initDateFormat<C extends CreateDayjsOption>(customOption?: C) {
  if (customOption == null) {
    return defaultOption
  }

  return { ...defaultOption, ...customOption }
}

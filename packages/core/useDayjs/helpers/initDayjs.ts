import type { CreateDayjsOption } from '../types'

const defaultOption = {
  template: 'MM/DD/YY H:mm:ss A Z'
} as Required<CreateDayjsOption>

/** 选项初始化 */
export function initDayjs(customOption?: CreateDayjsOption) {
  if (customOption == null) {
    return defaultOption
  }

  return { ...defaultOption, ...customOption }
}

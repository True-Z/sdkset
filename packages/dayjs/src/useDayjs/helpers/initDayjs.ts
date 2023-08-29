import type { CreateDayjsOption } from '../types'

const defaultOption: Required<CreateDayjsOption> = {
  convers: 'dayjs',
  template: 'YYYY-MM-DD HH:mm:ss'
}

/** 选项初始化 */
export function initDayjs<C extends CreateDayjsOption>(customOption?: C): Required<CreateDayjsOption> {
  if (customOption == null) {
    return defaultOption
  }

  return { ...defaultOption, ...customOption }
}

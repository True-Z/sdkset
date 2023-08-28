import type { CreateDayjsOption } from '../types'

const defaultOption: Required<CreateDayjsOption> = {
  date: new Date(),
  convers: 'format',
  template: 'YYYY-MM-DD HH:mm:ss'
}

/** 选项初始化 */
export function init<C extends CreateDayjsOption>(customOption?: C) {
  if (customOption == null) {
    return defaultOption
  }
  const config = {} as Required<CreateDayjsOption>
  Object.keys(defaultOption).forEach((key) => {
    config[key] = customOption[key] || defaultOption[key]
  })
  return config
}

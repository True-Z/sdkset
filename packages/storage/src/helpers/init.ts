import { CreateStorageOption } from '../types'

const defaultOption: Required<CreateStorageOption> = {
  type: 'local'
}

/** 选项初始化 */
export function init<C extends CreateStorageOption>(customOption?: C) {
  if (customOption == null) {
    return defaultOption
  }
  const config = {} as Required<CreateStorageOption>
  Object.keys(defaultOption).forEach((key) => {
    config[key] = customOption[key] || defaultOption[key]
  })
  return config
}

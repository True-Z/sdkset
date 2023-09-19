import type { CreateAxiosOption } from '../types'

const defaultOption: Required<CreateAxiosOption> = {
  interceptor: {}
}

/** 选项初始化 */
export function initAxios<C extends CreateAxiosOption>(customOption?: C): Required<CreateAxiosOption> {
  if (customOption == null) {
    return defaultOption
  }

  return { ...defaultOption, ...customOption }
}

import type { CreateStorageOption } from '../types'

const defaultOption: Required<CreateStorageOption> = {
  storageType: 'localStorage',
  expireTime: 30 * 24 * 60 * 60 * 1000
}

/** 选项初始化 */
export function initStorage<C extends CreateStorageOption>(customOption?: C): Required<CreateStorageOption> {
  if (customOption == null) {
    return defaultOption
  }

  return { ...defaultOption, ...customOption }
}

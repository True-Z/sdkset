import { initStorage, WrapperStorage } from './helpers'

import type { CreateStorageOption } from './types'
import type { Dictionary } from '@sdkset/types'

const storageCache: Dictionary<WrapperStorage> = {}

/**
 * 返回一个[Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)包装器对象。
 * 包装器对`storage`调用方式进行了简化并支持设置过期时间。
 *
 * @example
 * const storage = useStorage()
 *
 * storage.set('key', 'value')
 * storage.get('key')
 * => 'value'
 *
 * storage.set('key', 'value', expireTime)
 * ...
 * storage.get('key')
 * => null
 *
 * storage.remove('key')
 * storage.get('key')
 * => null
 *
 * @param option 包装器选项
 * @param option.storageType 存储类型（default：'localStorage'）
 * @param option.expireTime 默认过期时间（default：30 天）
 */
export function useStorage(option?: CreateStorageOption) {
  const { storageType, expireTime } = initStorage(option)

  if (!storageCache[storageType]) {
    storageCache[storageType] = new WrapperStorage(storageType, expireTime)
  }

  return storageCache[storageType]
}

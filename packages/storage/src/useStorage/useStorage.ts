import { initStorage, WrapperStorage } from './helpers'

import type { CreateStorageOption } from './types'
import type { Dictionary } from '@sdkset/types'

const storageCache: Dictionary<WrapperStorage> = {}

/**
 * 返回一个[Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)包装器对象。
 * 包装器对`storage`调用方式进行了简化并支持设置过期时间。
 *
 * @method
 * `storage.self(): Storage`
 *
 * 返回`storage`自身。
 *
 * `storage.get(key, property): unknown`
 *
 * 返回`storage`给定键的值，无数据或已过期返回`null`。
 *
 * `storage.set(key, value, customExpire): void`
 *
 * 将键值对添加到`storage`中，如果键名存在，则更新其对应的值。
 *
 * `storage.remove(key): void`
 *
 * 删除`storage`中的给定键名。
 *
 * `storage.clear(): void`
 *
 * 清空`storage`中的所有键名。
 *
 * `storage.keys(): string[]`
 *
 * 返回一个数组，数组由`storage`中所有的键组成。
 *
 * `storage.values(): unknown[]`
 *
 * 返回一个数组，数组由`storage`中所有的值组成。
 *
 * `storage.entries(): Dictionary`
 *
 * 返回一个对象，对象由`storage`中所有的键值对组成。
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

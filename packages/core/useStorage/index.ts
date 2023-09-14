import { initStorage, WrapperStorage } from './helpers'

import type { CreateStorageOption, StorageType } from './types'

export * from './types'

export type { WrapperStorage } from './helpers'

/**
 * 返回一个[Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)包装器对象。
 * 包装器对`Storage`使用方式进行了简化并支持设置过期时间。
 *
 * @example
 * const storage = useStorage()
 *
 * storage.set('key', 'value')
 * storage.get('key')
 * => 'value'
 *
 * storage.get('unknown', 'defValue')
 * => 'defValue'
 *
 * storage.remove('key')
 * storage.get('key')
 * => null
 *
 * storage.set('key', 'value', expireTime)
 * ...
 * storage.get('key')
 * => null
 *
 * @param [storageType] 存储类型
 * @param [option] 包装器选项
 * @param [option.expireTime = 30 天] 默认过期时间毫秒数
 *
 * @default
 * useStorage('localStorage', {
 *   expireTime: 30 * 24 * 60 * 60 * 1000 // 默认过期时间毫秒数
 * })
 */

export function useStorage(storageType?: StorageType, option?: CreateStorageOption) {
  const storage = storageType === 'sessionStorage' ? sessionStorage : localStorage
  return new WrapperStorage(storage, initStorage(option))
}

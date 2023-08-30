import type { StorageFormat, StorageProperty, StorageType } from '../types'
import type { Dictionary } from '@sdkset/types'

/** 包装器类 */
export class WrapperStorage {
  readonly #storage: Storage

  readonly #expireTime: number

  constructor(storageType: StorageType, expireTime: number) {
    this.#storage = storageType === 'sessionStorage' ? sessionStorage : localStorage
    this.#expireTime = expireTime
  }

  /** 返回`storage`自身。 */
  self() {
    return this.#storage
  }

  /**
   * 返回`storage`给定键的值，无数据或已过期返回`null`。
   *
   * @example
   * useStorage().get('key')
   * => 'value'
   *
   * useStorage().get('key', 'expire')
   * => 1693275351948
   *
   * @param key 给定键
   * @param property 萃取属性
   */
  get(key: string, property: StorageProperty = 'value') {
    const json = this.#storage.getItem(key)
    if (!json) {
      return null
    }
    try {
      const storageData: StorageFormat = JSON.parse(json)
      if (storageData.expire && new Date().getTime() > storageData.expire) {
        this.remove(key)
        return null
      }
      return storageData[property]
    } catch {
      return null
    }
  }

  /**
   * 将键值对添加到`storage`中，如果键名存在，则更新其对应的值。
   *
   * @example
   * useStorage().set('key', 'value')
   *
   * useStorage().set('key', 'value', new Date().getTime() + oneDay)
   *
   * @param key 给定键
   * @param value 给定值
   * @param customExpire 给定过期时间，传递 true 则使用默认过期时间。
   */
  set(key: string, value: unknown, customExpire?: number | boolean) {
    const json = {} as StorageFormat
    if (customExpire) {
      json.expire = customExpire === true ? this.#expireTime : customExpire
    }
    json.value = value
    this.#storage.setItem(key, JSON.stringify(json))
  }

  /**
   * 删除`storage`中的给定键名。
   *
   * @example
   * useStorage().remove('key')
   *
   * @param key 给定键
   */
  remove(key: string) {
    this.#storage.removeItem(key)
  }

  /**
   * 清空`storage`中的所有键名。
   *
   * @example
   * useStorage().clear()
   */
  clear() {
    this.#storage.clear()
  }

  /**
   * 返回一个数组，数组由`storage`中所有的键组成。
   *
   * @example
   * useStorage().keys()
   * => ['key1', 'key2', ...]
   */
  keys() {
    const result = []
    for (let i = 0, { length } = this.#storage; i < length; i++) {
      const currKey = this.#storage.key(i)
      if (currKey) {
        result.push(currKey)
      }
    }
    return result
  }

  /**
   * 返回一个数组，数组由`storage`中所有的值组成。
   *
   * @example
   * useStorage().values()
   * => ['value1', 'value2', ...]
   */
  values() {
    const result = []
    const keys = this.keys()
    for (let i = 0, { length } = keys; i < length; i++) {
      result[i] = this.get(keys[i])
    }
    return result
  }

  /**
   * 返回一个对象，对象由`storage`中所有的键值对组成。
   *
   * @example
   * useStorage().entries()
   * => { key1: value1, ... }
   */
  entries() {
    const result: Dictionary = {}
    const keys = this.keys()
    for (let i = 0, { length } = keys; i < length; i++) {
      result[i] = this.get(keys[i])
    }
    return result
  }
}

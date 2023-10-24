import type { CreateStorageOption, StorageFormat, StorageProperty } from '../types'

/** 包装器类。 */
export class WrapperStorage {
  /** `storage`对象。 */
  get self() {
    return this.#storage
  }

  readonly #storage: Storage

  readonly #expireTimeMs: number

  constructor(storage: Storage, option: Required<CreateStorageOption>) {
    const { expireTimeMs } = option
    this.#storage = storage
    this.#expireTimeMs = expireTimeMs
  }

  /**
   * 返回`storage`给定键的值，支持默认值和萃取属性，如有设置过期时间且数据已过期返回`null`。
   *
   * @example
   * useStorage().get('unknown', 'defValue')
   * => 'defValue'
   *
   * useStorage().get('key', null, 'expire')
   * => 1693275351948
   * ...After time...
   * useStorage().get('key', null, 'expire')
   * => null
   *
   * useStorage().get('key')
   * => { value: 'value', expire: 1693275351948 }
   *
   *
   * @param key 给定键
   * @param def 默认值
   * @param property 萃取属性
   */
  get(key: string, def?: unknown, property?: StorageProperty) {
    const json = this.#storage.getItem(key)
    if (json == null) {
      return def || null
    }
    try {
      const storageData: StorageFormat = JSON.parse(json)
      if (storageData.expire && new Date().getTime() > storageData.expire) {
        this.remove(key)
        return null
      }
      return property ? storageData[property] : storageData
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
   * @param customExpireMs 给定过期时间（毫秒），传递 true 则使用默认选项的过期时间
   */
  set(key: string, value: unknown, customExpireMs?: true | number) {
    if (!customExpireMs) {
      this.#storage.setItem(key, JSON.stringify(value))
      return
    }
    const now = new Date().getTime()
    const json = {} as StorageFormat
    json.expire = customExpireMs === true ? now + this.#expireTimeMs : now + customExpireMs
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
}

import { Dictionary } from '@sdkset/types'

import { StorageFormat } from '../types'

const DEFAULT_EXPIRE = 30 * 24 * 60 * 60 * 1000

type StorageType = 'local' | 'session'

const demo: Dictionary<StorageWrapper> = {}

export function useStorage(type: StorageType) {
  const storage = type === 'session' ? sessionStorage : localStorage
  if (!demo[type]) {
    demo[type] = new StorageWrapper(storage)
  }
  return demo[type]
}

export class StorageWrapper {
  readonly #storage: Storage

  constructor(storage: Storage) {
    this.#storage = storage
  }

  get(key: string, expireTime?: boolean) {
    const json = this.#storage.getItem(key)
    if (!json) {
      return null
    }
    try {
      const storageData: StorageFormat = JSON.parse(json)
      const { value, expire } = storageData
      if (expireTime) {
        return expire
      }
      if (expire == null || expire >= new Date().getTime()) {
        return value
      }
    } catch {
      return null
    }
  }

  set(key: string, value: unknown, expire: number | boolean) {
    const json = {} as StorageFormat
    if (expire) {
      json.expire = expire === true ? DEFAULT_EXPIRE : expire
    }
    json.value = value
    this.#storage.setItem(key, JSON.stringify(json))
  }

  remove(key: string) {
    this.#storage.removeItem(key)
  }

  clear() {
    this.#storage.clear()
  }

  has(key: string) {
    return !!this.get(key)
  }

  keys() {
    const _keys = []
    for (let i = 0, { length } = this.#storage; i < length; i++) {
      _keys[i] = this.#storage.key(i)
    }
    return _keys
  }

  values() {
    const _values = []
    for (let i = 0, { length } = this.#storage; i < length; i++) {
      const curKey = this.#storage.key(i)
      if (curKey) {
        _values[i] = this.get(curKey)
      }
    }
    return _values
  }

  entries() {
    const result: Dictionary = {}
    for (let i = 0, { length } = this.#storage; i < length; i++) {
      const curKey = this.#storage.key(i)
      if (curKey) {
        result[curKey] = this.get(curKey)
      }
    }
    return result
  }
}

import { getLocal, removeLocal } from '../localStorage'

import type { StorageData } from '../types'

/**
 * 返回`localStorage`给定键设置为超时数据的值，如未设置超时时间或已过超时时间则直接返回超时数据，否则返回`undefined`，
 *
 * @example
 * getExpireLocal('key')
 * => { ... }
 *
 * @param key 给定键
 */
export function getExpireLocal(key: string) {
  const storageData: StorageData = getLocal(key)
  if (!storageData) {
    removeLocal(key)
    return
  }
  const { value, expire } = storageData
  if (expire == null || expire >= new Date().getTime()) {
    return value
  }
}

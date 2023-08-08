import { getLocal } from '../localStorage'

import type { StorageData } from '../types'

/**
 * 返回`localStorage`给定键的超时时间，无给定键数据返回`undefined`。
 *
 * @example
 * getLocalExpireTime('key')
 * => expire time
 *
 * @param key 给定键
 */
export function getLocalExpireTime(key: string) {
  const storageData: StorageData = getLocal(key)
  if (!storageData) {
    return
  }
  const { expire } = storageData
  return expire
}

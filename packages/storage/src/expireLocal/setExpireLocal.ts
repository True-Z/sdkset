import { setLocal } from '../localStorage'

// 默认超时时间（30天）
const DEFAULT_CACHE_TIME = 30 * (24 * 60 * 60 * 1000)

/**
 * 设置`localStorage`给定键的值为给定超时数据。
 *
 * @example
 * setExpireLocal('key', 'value', 365 * (24 * 60 * 60 * 1000))
 *
 * @param key 给定键
 * @param value 给定超时数据
 * @param expire 超时时间（单位：毫秒，默认：30天）
 */
export function setExpireLocal(key: string, value: unknown, expire: number = DEFAULT_CACHE_TIME) {
  const currTime = new Date().getTime()
  const storageData = {
    value,
    expire: currTime + expire
  }
  setLocal(key, storageData)
}

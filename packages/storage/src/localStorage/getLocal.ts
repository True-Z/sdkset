import { removeLocal } from './removeLocal'

/**
 * 返回`localStorage`给定键的值，无数据返回`undefined`。
 *
 * @example
 * getLocal('key')
 * => { ... }
 *
 * @param key 给定键
 */
export function getLocal(key: string) {
  const json = localStorage.getItem(key)
  if (!json) {
    return
  }
  try {
    return JSON.parse(json)
  } catch {
    removeLocal(key)
  }
}

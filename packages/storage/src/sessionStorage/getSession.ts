import { removeSession } from './removeSession'

/**
 * 返回`sessionStorage`给定键的值，无数据返回`undefined`。
 *
 * @example
 * getSession('key')
 * => { ... }
 *
 * @param key 给定键
 */
export function getSession(key: string) {
  const json = sessionStorage.getItem(key)
  if (!json) {
    return
  }
  try {
    return JSON.parse(json)
  } catch {
    removeSession(key)
  }
}

/**
 * 删除`sessionStorage`给定键的值。
 *
 * @example
 * removeSession('key')
 *
 * @param key 给定键
 */
export function removeSession(key: string) {
  sessionStorage.removeItem(key)
}

/**
 * 删除`localStorage`给定键。
 *
 * @example
 * removeLocal('key')
 *
 * @param key 给定键
 */
export function removeLocal(key: string) {
  localStorage.removeItem(key)
}

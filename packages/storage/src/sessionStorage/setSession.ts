/**
 * 设置`sessionStorage`给定键的值为给定值。
 *
 * @example
 * setSession('key', 'value')
 *
 * @param key 给定键
 * @param value 给定值
 */
export function setSession(key: string, value: unknown) {
  const json = JSON.stringify(value)
  sessionStorage.setItem(key, json)
}

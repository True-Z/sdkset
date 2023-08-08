/**
 * 设置`localStorage`给定键为给定值。
 *
 * @example
 * setLocal('key', 'value')
 *
 * @param key 给定键
 * @param value 给定值
 */
export function setLocal(key: string, value: unknown) {
  const json = JSON.stringify(value)
  localStorage.setItem(key, json)
}

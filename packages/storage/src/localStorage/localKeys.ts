/**
 * 返回一个数组，数组由`localStorage`数据的键组成。
 *
 * @example
 * localKeys()
 * => ['key1', 'key2', ...]
 */
export function localKeys() {
  const results: unknown[] = []
  for (let i = 0, { length } = localStorage; i < length; i++) {
    results[i] = localStorage.key(i)
  }
  return results
}

/**
 * 返回一个数组，数组由`sessionStorage`数据的键组成。
 *
 * @example
 * sessionKeys()
 * => ['key1', 'key2', ...]
 */
export function sessionKeys() {
  const results: unknown[] = []
  for (let i = 0, { length } = sessionStorage; i < length; i++) {
    results[i] = sessionStorage.key(i)
  }
  return results
}

import { getLocal } from './getLocal'

/**
 * 返回一个数组，数组由`localStorage`数据的键值组成。
 *
 * @example
 * localValues()
 * => ['value1', ...]
 */
export function localValues() {
  const results: unknown[] = []
  for (let i = 0, { length } = localStorage; i < length; i++) {
    results[i] = getLocal(localStorage.key(i) || '')
  }
  return results
}

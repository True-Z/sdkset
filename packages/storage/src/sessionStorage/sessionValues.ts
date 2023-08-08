import { getSession } from './getSession'

/**
 * 返回一个数组，数组由`sessionStorage`数据的键值组成。
 *
 * @example
 * sessionValues()
 * => ['value1', ...]
 */
export function sessionValues() {
  const results: unknown[] = []
  for (let i = 0, { length } = sessionStorage; i < length; i++) {
    results[i] = getSession(sessionStorage.key(i) || '')
  }
  return results
}

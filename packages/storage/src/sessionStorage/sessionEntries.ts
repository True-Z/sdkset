import { getSession } from './getSession'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个对象，对象由`sessionStorage`数据的键-值对组成。
 *
 * @example
 * sessionEntries()
 * => {key1: value1, ...}
 */
export function sessionEntries() {
  const results: Dictionary = {}
  for (let i = 0, { length } = sessionStorage; i < length; i++) {
    const currentKey = sessionStorage.key(i)
    if (currentKey) {
      results[currentKey] = getSession(currentKey)
    }
  }
  return results
}

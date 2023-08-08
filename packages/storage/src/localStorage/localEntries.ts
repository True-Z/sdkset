import { getLocal } from './getLocal'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个对象，对象由`localStorage`数据的键-值对组成。
 *
 * @example
 * localEntries()
 * => {key1: value1, ...}
 */
export function localEntries() {
  const results: Dictionary = {}
  for (let i = 0, { length } = localStorage; i < length; i++) {
    const currentKey = localStorage.key(i)
    if (currentKey) {
      results[currentKey] = getLocal(currentKey)
    }
  }
  return results
}

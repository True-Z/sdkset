import { _getLength } from './_getLength'
import { contains } from './contains'
import { isArray } from './isArray'

import type { List } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定数组集合的交集组成。
 *
 * @example
 * intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])
 * => [1, 2]
 *
 * intersection([1, 2, 3])
 * => [1, 2, 3]
 *
 * @param arrays 给定数组集合
 */
export function intersection<V extends List>(...arrays: V[]) {
  if (!isArray(arrays[0])) {
    return []
  }
  const results: V[] = []
  const argsLength = arrays.length
  for (let i = 0, length = _getLength(arrays[0]); i < length; i++) {
    const value = arrays[0][i]
    if (!contains(results, value)) {
      let j
      for (j = 1; j < argsLength; j++) {
        if (!contains(arrays[j], value)) {
          break
        }
      }
      if (j === argsLength) {
        results.push(value)
      }
    }
  }
  return results
}

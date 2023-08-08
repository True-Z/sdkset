import { _getLength } from './_getLength'
import { isNumber } from './isNumber'
import { max } from './max'
import { pluck } from './pluck'

import type { List } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定数组按索引分组组成。`zip`的反函数。
 *
 * @example
 * unzip([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]])
 * => [['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]]
 *
 * @param arrays 给定数组
 */
export function unzip<V extends List<List>>(arrays: V) {
  if (arrays == null) {
    return []
  }
  const computed = max(arrays, _getLength)
  let length = 0
  if (!isNumber(computed)) {
    length = computed.length
  }
  const results = []
  for (let i = 0; i < length; i++) {
    results[i] = pluck(arrays, i)
  }
  return results
}

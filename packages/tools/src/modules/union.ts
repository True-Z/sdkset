import { uniq } from './uniq'

import type { List } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定数组集合的并集组成，`uniq`的简化版本且接收参数为数组的集合。
 * 当处理数据量小（length < 100,000）时，推荐使用`Array.from(new Set(array))`。
 *
 * @example
 * union([1, 2, 3], [101, 2, 1, 10], [2, 1])
 * => [1, 2, 3, 101, 10]
 *
 * @param arrays 给定数组集合
 */
export function union<V>(...arrays: List<V>[]) {
  arrays = arrays.flat()
  return uniq(arrays)
}

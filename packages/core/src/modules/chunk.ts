import { slice } from './_setup'

import type { TypeOfList } from '../types'
import type { List } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定数组拆分成多个`size`长度的区块组成。
 * 如果给定数组无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2)
 * => [[1, 2], [3, 4], [5]]
 *
 * @param array 给定数组
 * @param size 区块大小
 */
export function chunk<V extends List>(array: List, size = 1) {
  const results: TypeOfList<V>[][] = []
  if (array == null) {
    return results
  }
  size >>>= 0 // 取正整数
  let i = 0
  const { length } = array
  while (i < length) {
    results.push(slice.call(array, i, (i += size)))
  }
  return results
}

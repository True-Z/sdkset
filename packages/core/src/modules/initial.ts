import { slice } from './_setup'

import type { TypeOfList } from '../types'
import type { List } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定数组中除了最后一个元素之外的所有元素（去除给定数组中的最后一个元素）组成。
 *
 * @example
 * initial([1, 2, 3])
 * => [1, 2]
 *
 * @param array 给定数组
 */
export function initial<V extends List>(array: V) {
  if (array != null && array.length) {
    return slice.call(array, 0, -1) as TypeOfList<V>
  }
  return []
}

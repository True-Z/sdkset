import { slice } from './_setup'

import type { TypeOfList } from '../types'
import type { List } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定数组中除了第一个元素外之外的所有元素（去除给定数组中的第一个元素）组成。
 *
 * @example
 * tail([1, 2, 3])
 * => [2, 3]
 *
 * @param array 给定数组
 */
export function tail<V extends List>(array: V): TypeOfList<V>[] {
  if (array != null && array.length) {
    return slice.call(array, 1)
  }
  return []
}

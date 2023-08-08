import { filter } from './filter'

import type { Truthy, TypeOfList } from '../types'
import type { List } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定数组中所有的非假值元素组成。例如`false`，`null`，`0`，`""`，`undefined`和`NaN`都被认为是“假值”。
 *
 * @example
 * compact([0, 1, false, 2, '', 3])
 * => [1, 2, 3]
 *
 * @param array 给定数组
 */
export function compact<V extends List>(array: V) {
  return filter(array, Boolean) as Truthy<TypeOfList<V>>
}

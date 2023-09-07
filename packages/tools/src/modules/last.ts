import type { TypeOfList } from '../types'
import type { List } from '@sdkset/types'

/**
 * 返回给定数组的最后一个元素，无数据返回`undefined`。
 *
 * @example
 * last([1, 2, 3])
 * => 3
 *
 * @param array 给定数组
 */
export function last<V extends List>(array: V) {
  if (array != null && array.length) {
    return array[array.length - 1] as TypeOfList<V>[]
  }
}

import type { TypeOfList } from '../types'
import type { List } from '@sdkset/types'

/**
 * 返回给定数组的第一个元素，无数据返回`undefined`。
 *
 * @example
 * head([1, 2, 3])
 * => 1
 *
 * @param array 给定数组
 */
export function head<V extends List>(array: V) {
  if (array != null && array.length) {
    return array[0] as TypeOfList<V>
  }
}

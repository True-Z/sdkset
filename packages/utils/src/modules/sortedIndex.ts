import { _cb } from './_cb'

import type { Iteratee, TypeOfList } from '../types'
import type { List } from '@sdkset/types'

/**
 * 使用二分查找返回`value`在给定数组（数组已升序）对应处的索引，常用在需要确定`value`在给定数组中的位置序号，`value`按此序号插入能保持给定数组原有的排序。
 *
 * @example
 * sortedIndex([10, 20, 30, 40, 50], 35)
 * => 3
 *
 * const stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}]
 * sortedIndex(stooges, {name: 'larry', age: 50}, 'age')
 * => 1
 *
 * @param array 给定数组
 * @param value 需检索值
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export function sortedIndex<V extends List>(
  array: V,
  value: TypeOfList<V>,
  iteratee?: Iteratee<V, unknown>,
  context?: unknown
) {
  if (array == null) {
    return 0
  }
  const cb = _cb(iteratee, context, 1)
  const result = Number(cb(value))
  let low = 0
  let high = array.length
  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    if (Number(cb(array[mid])) < result) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return low
}

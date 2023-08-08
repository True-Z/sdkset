import { _cb } from './_cb'
import { map } from './map'
import { pluck } from './pluck'

import type { Iteratee, TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定集合元素通过排序后组成，如果传递`iteratee`参数，`iteratee`将作为给定集合中值的排序依据。排序迭代器也可以是属性名称的字符串（比如`length`）。
 *
 * @example
 * sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num) })
 * => [5, 4, 6, 3, 1, 2]
 *
 * const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]
 * sortBy(stooges, 'name')
 * => [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}]
 *
 * @param list 给定集合
 * @param sortType 指定升序 or 降序 true-升 false-降
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export function sortBy<V extends Collection, I extends Iteratee<V, unknown>>(
  list: V,
  sortType: boolean,
  iteratee?: I,
  context?: unknown
) {
  const cb = _cb(iteratee, context)
  let index = 0
  return pluck(
    map(list, (value, key, collect) => ({
      value,
      index: index++,
      criteria: cb(value, key, collect)
    })).sort((next, curr) => {
      const nextVal = next.criteria
      const currVal = curr.criteria
      if (nextVal !== currVal) {
        // 1：不认同 next curr，恢复原状  -1：认同 next curr，交换
        if (sortType) {
          if (nextVal > currVal || nextVal === undefined) return 1 // [currVal, nextVal] b a
          if (nextVal < currVal || currVal === undefined) return -1 // [nextVal, currVal] a b
        } else {
          if (nextVal > currVal || currVal === undefined) return -1 // [nextVal, currVal] a b
          if (nextVal < currVal || nextVal === undefined) return 1 // [currVal, nextVal] b a
        }
      }
      return 0
    }),
    'value'
  ) as TypeOfCollection<V>[]
}

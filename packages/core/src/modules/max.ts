import { _cb } from './_cb'
import { forEach } from './forEach'
import { isArrayLike } from './isArrayLike'
import { values } from './values'

import type { Iteratee, TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 返回给定集合中的最大值。如果传递`iteratee`参数，`iteratee`将作为给定集合中值的排序依据。
 * 如果给定集合为空，将返回`-Infinity`。
 *
 * @example
 * const stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50}, { name: 'curly', age: 60 }]
 * max(stooges, function(stooge){ return stooge.age })
 * => { name: 'curly', age: 60 }
 *
 * @param list 给定集合
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export function max<V extends Collection, I extends Iteratee<V, unknown>>(list: V, iteratee?: I, context?: unknown) {
  if (list == null) {
    return -Infinity
  }
  let result = -Infinity
  let lastComputed = -Infinity
  let computed: number
  if (iteratee == null) {
    const temp = isArrayLike(list) ? list : values(list)
    for (let i = 0, { length } = temp; i < length; i++) {
      computed = temp[i]
      if (computed != null && computed > result) {
        result = computed
      }
    }
  } else {
    const cb = _cb(iteratee, context)
    forEach(list, (value, index, collect) => {
      computed = Number(cb(value, index, collect))
      if (computed > lastComputed || (computed === -Infinity && result === -Infinity)) {
        result = value
        lastComputed = computed
      }
    })
  }
  return result as number | TypeOfCollection<V>
}

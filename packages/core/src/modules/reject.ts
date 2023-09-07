import { filter } from './filter'
import { negate } from './negate'

import type { Iteratee } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定集合中没有通过`predicate`真值检测的元素组成，`filter`的反函数。
 *
 * @example
 * var odds = reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0 })
 * => [1, 3, 5]
 *
 * @param list 给定集合
 * @param predicate 谓语迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为谓语迭代器函数的执行上下文 this
 */
export function reject<V extends Collection, I extends Iteratee<V, boolean>>(
  list: V,
  predicate?: I,
  context?: unknown
) {
  return filter(list, negate(predicate), context)
}

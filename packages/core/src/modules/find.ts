import { findIndex } from './findIndex'
import { findKey } from './findKey'
import { isArrayLike } from './isArrayLike'
import { isObject } from './isObject'

import type { Iteratee, TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 数组推荐原生：[Array.prototype.find](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)。
 * 返回给定集合中第一个通过`predicate`真值检测的元素值，如果没有元素通过检测则返回`undefined`。
 *
 * @example
 * find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0 })
 * => 2
 *
 * @param list 给定集合
 * @param predicate 谓语迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为谓语迭代器函数的执行上下文 this
 */
export function find<V extends Collection, I extends Iteratee<V, boolean>>(list: V, predicate?: I, context?: unknown) {
  let value: TypeOfCollection<V> | undefined
  if (isArrayLike(list)) {
    const key = findIndex(list, predicate, context)
    if (key !== -1) {
      value = list[key]
    }
  } else if (isObject(list)) {
    const key = findKey(list, predicate, context)
    if (key !== undefined) {
      value = list[key]
    }
  }
  return value
}

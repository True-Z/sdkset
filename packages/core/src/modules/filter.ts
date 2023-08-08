import { _cb } from './_cb'
import { isArrayLike } from './isArrayLike'
import { isObject } from './isObject'
import { keys } from './keys'

import type { Iteratee, TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 数组推荐原生：[Array.prototype.filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)。
 * 返回一个数组，数组由给定集合中通过`predicate`真值检测的元素组成。
 *
 * @example
 * filter({ a: 1, b: 2, c: 3, d: 4 }, (val) => val % 2 === 0)
 * => [2, 4]
 *
 * @param list 给定集合
 * @param predicate 谓语迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为谓语迭代器函数的执行上下文 this
 */
export function filter<V extends Collection, I extends Iteratee<V, unknown>>(
  list: V,
  predicate?: I,
  context?: unknown
) {
  const cb = _cb(predicate, context)
  const results: TypeOfCollection<V>[] = []
  if (isArrayLike(list)) {
    for (let i = 0, { length } = list; i < length; i++) {
      if (cb(list[i], i, list)) {
        results.push(list[i])
      }
    }
  } else if (isObject(list)) {
    const _keys = keys(list)
    for (let i = 0, { length } = _keys; i < length; i++) {
      if (cb(list[_keys[i]], _keys[i], list)) {
        results.push(list[_keys[i]])
      }
    }
  }
  return results
}

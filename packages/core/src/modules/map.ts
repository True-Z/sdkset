import { _cb } from './_cb'
import { isArrayLike } from './isArrayLike'
import { isObject } from './isObject'
import { keys } from './keys'

import type { Iteratee, IterateeResult, TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 数组推荐原生：[Array.prototype.map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)。
 * 返回一个数组，数组由给定集合中每个元素调用一次`iteratee`函数的返回值组成。
 *
 * @example
 * map([1, 2, 3], function(num){ return num * 3 })
 * => [3, 6, 9]
 *
 * map({ one: 1, two: 2, three: 3 }, function(num, key){ return num * 3 })
 * => [3, 6, 9]
 *
 * map([[1, 2], [3, 4]], first)
 * => [1, 3]
 *
 * @param list 给定集合
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export function map<V extends Collection, I extends Iteratee<V, unknown>>(list: V, iteratee?: I, context?: unknown) {
  const cb = _cb(iteratee, context)
  const results = []
  if (isArrayLike(list)) {
    for (let i = 0, { length } = list; i < length; i++) {
      results[i] = cb(list[i], i, list)
    }
  } else if (isObject(list)) {
    const _keys = keys(list)
    for (let i = 0, { length } = _keys; i < length; i++) {
      results[i] = cb(list[_keys[i]], _keys[i], list)
    }
  }
  return results as IterateeResult<I, TypeOfCollection<V>>[]
}

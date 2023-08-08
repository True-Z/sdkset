import { _toPath } from './_toPath'
import { contains } from './contains'
import { isFunction } from './isFunction'
import { negate } from './negate'
import { pick } from './pick'

import type { ObjectIterator, TypeOfDictionary } from '../types'
import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个对象，对象由给定对象中没有通过`predicate`真值检测的元素组成。`pick`的反函数。
 *
 * @example
 * omit({ name: 'moe', age: 50, userid: 'moe1' }, 'userid')
 * => { name: 'moe', age: 50 }
 *
 * omit({ name: 'moe', age: 50, userid: 'moe1' }, ['age', 'userid'])
 * => { name: 'moe' }
 *
 * omit({name: 'moe', age: 50, userid: 'moe1' }, function(value, key, object) {
 *   return isNumber(value)
 * })
 * => { name: 'moe', userid: 'moe1' }
 *
 * @param object 给定对象
 * @param predicate 谓语迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为谓语迭代器函数的执行上下文 this
 */
export function omit<V extends Dictionary, K extends string>(
  object: V,
  predicate: ObjectIterator<TypeOfDictionary<V>, boolean> | K | K[],
  context?: unknown
) {
  let cb
  if (isFunction(predicate)) {
    cb = negate(predicate)
  } else {
    cb = function fn(value: unknown, key: unknown) {
      return !contains(_toPath(predicate), key)
    }
  }
  return pick(object, cb, context) as Omit<V, K> | Partial<V>
}

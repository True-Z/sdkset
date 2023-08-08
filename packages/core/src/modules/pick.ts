import { _keyInObj } from './_keyInObj'
import { _optimizeCb } from './_optimizeCb'
import { _toPath } from './_toPath'
import { allKeys } from './allKeys'
import { isFunction } from './isFunction'

import type { ObjectIterator, TypeOfDictionary } from '../types'
import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个对象，对象由给定对象中通过`predicate`真值检测的元素组成。
 *
 * @example
 * pick({ name: 'moe', age: 50, userid: 'moe1' }, 'age')
 * => { age: 50 }
 *
 * pick({ name: 'moe', age: 50, userid: 'moe1' }, ['name', 'age'])
 * => { name: 'moe', age: 50 }
 *
 * pick({ name: 'moe', age: 50, userid: 'moe1' }, function(value, key, object) {
 *   return isNumber(value)
 * })
 * => { age: 50 }
 *
 * @param object 给定对象
 * @param predicate 谓语迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为谓语迭代器函数的执行上下文 this
 */
export function pick<V extends Dictionary, K extends string>(
  object: V,
  predicate: ObjectIterator<TypeOfDictionary<V>, boolean> | K | K[],
  context?: unknown
) {
  object = Object(object)
  let cb
  let keys
  if (isFunction(predicate)) {
    cb = _optimizeCb(predicate, context)
    keys = allKeys(object)
  } else {
    cb = _keyInObj
    keys = _toPath(predicate)
  }
  const result: Dictionary = {}
  for (let i = 0, { length } = keys; i < length; i++) {
    const key = keys[i]
    const value = object[key]
    if (cb(value, key, object)) {
      result[key] = value
    }
  }
  return result as Pick<V, K> | Partial<V>
}

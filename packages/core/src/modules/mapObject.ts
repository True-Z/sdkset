import { _cb } from './_cb'
import { keys } from './keys'

import type { Iteratee, IterateeResult } from '../types'
import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个对象，对象由给定对象每个属性值通过`Iteratee`转换后组成。类似于`map`，但此方法用于对象。
 *
 * @example
 * mapObject({start: 5, end: 12}, function(val, key) {
 *   return val + 5;
 * });
 * => {start: 10, end: 17}
 *
 * @param object 给定对象
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export function mapObject<V extends Dictionary, I extends Iteratee<V, unknown>>(
  object: V,
  iteratee: I,
  context?: unknown
) {
  const cb = _cb(iteratee, context)
  const _keys = keys(object)
  const results: Dictionary = {}
  for (let i = 0, { length } = _keys; i < length; i++) {
    const currentKey = _keys[i]
    results[currentKey] = cb(object[currentKey], currentKey, object)
  }
  return results as { [K in keyof V]: IterateeResult<I, V[K]> }
}

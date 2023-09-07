import { _cb } from './_cb'
import { keys } from './keys'

import type { Iteratee } from '../types'
import type { Dictionary } from '@sdkset/types'

/**
 * 返回给定对象中第一个通过`predicate`真值检测的键，如果没有元素通过检测则返回`undefined`。
 *
 * @example
 * findKey({a: 1}, (value) => value === 1)
 * => a
 *
 * @param object 给定对象
 * @param predicate 谓语迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为谓语迭代器函数的执行上下文 this
 */
export function findKey<V extends Dictionary, I extends Iteratee<V, boolean>>(
  object: V,
  predicate?: I,
  context?: unknown
) {
  const cb = _cb(predicate, context)
  const _keys = keys(object)
  let key: string
  for (let i = 0, { length } = _keys; i < length; i++) {
    key = _keys[i]
    if (cb(object[key], key, object)) {
      return key
    }
  }
}

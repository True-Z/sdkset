import { _cb } from './_cb'
import { isArrayLike } from './isArrayLike'
import { isObject } from './isObject'
import { keys } from './keys'

import type { Iteratee } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 数组推荐原生：[Array.prototype.some](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)。
 * 返回一个布尔值，判断给定集合内是否至少有一个元素能通过`predicate`真值检测。
 *
 * @example
 * some([null, 0, 'yes', false], isString)
 * => true
 *
 * some([0, false], isString)
 * => false
 *
 * @param list 给定集合
 * @param predicate 谓语迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为谓语迭代器函数的执行上下文 this
 */
export function some<V extends Collection, I extends Iteratee<V, unknown>>(list: V, predicate?: I, context?: unknown) {
  const cb = _cb(predicate, context)
  if (isArrayLike(list)) {
    for (let i = 0, { length } = list; i < length; i++) {
      if (cb(list[i], i, list)) {
        return true
      }
    }
  } else if (isObject(list)) {
    const _keys = keys(list)
    for (let i = 0, { length } = _keys; i < length; i++) {
      if (cb(list[_keys[i]], _keys[i], list)) {
        return true
      }
    }
  }
  return false
}

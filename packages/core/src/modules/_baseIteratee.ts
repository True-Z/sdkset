import { _optimizeCb } from './_optimizeCb'
import { identity } from './identity'
import { isArray } from './isArray'
import { isFunction } from './isFunction'
import { isObject } from './isObject'
import { matcher } from './matcher'
import { property } from './property'

import type { TypeOfIteratee } from '../types'

/**
 * 生成可应用于每个迭代器函数的回调，返回所需的结果，可以是`identity` || 迭代器函数 || 属性匹配器 || 属性访问器。
 *
 * @example
 * _baseIteratee(null)
 * => identity
 *
 * _baseIteratee(func)
 * => optimizeCb
 *
 * _baseIteratee(Obj)
 * => matcher
 *
 * _baseIteratee(other)
 * => property
 *
 * @param value 给定值
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 * @param argCount 回调函数类型
 */
export function _baseIteratee<I, C extends unknown | undefined, A extends number | undefined>(
  value: I,
  context?: C,
  argCount?: A
) {
  if (value == null) {
    return identity as TypeOfIteratee<I, C, A>
  }
  if (isFunction(value)) {
    return _optimizeCb(value, context, argCount) as TypeOfIteratee<I, C, A>
  }
  if (isObject(value) && !isArray(value)) {
    return matcher(value) as TypeOfIteratee<I, C, A>
  }
  return property(value) as TypeOfIteratee<I, C, A>
}

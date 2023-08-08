import { _baseIteratee } from './_baseIteratee'

import type { TypeOfIteratee } from '../types'

/**
 * 在内部调用以生成回调的函数。它调用`Iteratee`如果被重写，则为`baseIteratee'。
 *
 * @example
 * _cb(null)
 * => identity
 *
 * @param value 可用于生成的值
 * @param context 上下文对象
 * @param argCount 回调函数类型
 */
export function _cb<I, C extends unknown | undefined, A extends number | undefined>(
  value?: I,
  context?: C,
  argCount?: A
) {
  return _baseIteratee(value, context, argCount) as TypeOfIteratee<I, C, A>
}

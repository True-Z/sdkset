import type { TypeOfOptimizeCb } from '../types'

/**
 * 用于创建特定的迭代函数，传入回调时，将在其他函数中重复应用功能。
 *
 * @example
 * _optimizeCb(func)
 * => func
 *
 * @param iteratee 给定迭代函数
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 * @param argCount 回调函数类型
 */
export function _optimizeCb<I, C extends unknown | undefined, A extends number | undefined>(
  iteratee?: I,
  context?: C,
  argCount?: A
) {
  if (context === undefined || typeof iteratee !== 'function') {
    return iteratee as TypeOfOptimizeCb<I, C, A>
  }
  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function fn<V>(value?: V) {
        return iteratee.call(context, value)
      } as TypeOfOptimizeCb<I, C, A>
    case 3:
      return function fn<V>(value?: V, index?: number | string, collection?: unknown) {
        return iteratee.call(context, value, index, collection)
      } as TypeOfOptimizeCb<I, C, A>
    case 4:
      return function fn<V>(accumulator?: unknown, value?: V, index?: number | string, collection?: unknown) {
        return iteratee.call(context, accumulator, value, index, collection)
      } as TypeOfOptimizeCb<I, C, A>
    default:
  }
  return function fn(...args: unknown[]) {
    return iteratee.apply(context, args)
  } as TypeOfOptimizeCb<I, C, A>
}

import { isFunction } from './isFunction'

/**
 * 返回给定函数的否定版本函数。
 *
 * @example
 * var isFalsy = negate(Boolean)
 * find([-2, -1, 0, 1, 2], isFalsy)
 * => 0
 *
 * @param predicate 给定函数
 */
export function negate<F>(predicate: F) {
  return function fn(this: unknown, ...args: unknown[]) {
    if (isFunction(predicate)) {
      return !predicate.apply(this, args)
    }
    return !predicate
  }
}

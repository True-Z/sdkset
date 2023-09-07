import type { Func } from '@sdkset/types'

/**
 * 返回一个函数，该函数将调用给定函数次数不超过`n`次，调用时可传递参数，
 * 之后再调用这个函数，将返回一次最后调用给定函数的结果。
 *
 * @example
 * const fn = before(2, (val) => val + 1)
 *
 * fn(1)
 * => 2
 *
 * fn(2)
 * => 2
 *
 * fn(3)
 * => 2
 *
 * @param n 调用次数
 * @param func 给定函数
 */
export function before(n: number, func: Func) {
  if (typeof func !== 'function') {
    throw new TypeError('The `func` parameter of the `before` is not a function')
  }

  n = n || 0
  let result: unknown
  return function fn(this: unknown, ...args: unknown[]) {
    if (--n > 0) {
      result = func.apply(this, args)
    }
    return result
  }
}

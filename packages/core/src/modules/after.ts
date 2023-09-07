import type { Func } from '@sdkset/types'

/**
 * 返回一个函数，该函数被调用`n`或更多次之后将马上触发给定函数，调用时可传递参数，`before`的反函数。
 *
 * @example
 * const fn = after(2, function(info) {
 *   console.log(info)
 * })
 *
 * fn('params...')
 * => undefined
 *
 * fn('params...')
 * => log 'params...'
 *
 * @param n 调用次数
 * @param func 给定函数
 */
export function after(n: number, func: Func) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  n = n || 0
  return function fn(this: unknown, ...args: unknown[]) {
    if (--n < 1) {
      return func.apply(this, args)
    }
  }
}

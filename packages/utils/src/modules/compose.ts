import { isFunction } from './isFunction'
import { some } from './some'

import type { Func } from '@sdkset/types'

/**
 * 返回一个由给定函数数组组合后的复合函数，也就是一个函数执行完之后把返回的结果再作为参数赋值给下一个函数来执行。以此类推，在数学里，把函数`f(), g(), 和 h()`组合起来可以得到复合函数`f(g(h()))`。
 *
 * @example
 * const fn = compose((val) => val += 1, (val) => val += 2)
 *
 * fn(1)
 * => 4
 *
 * @param functions 给定函数数组
 */
export function compose(...functions: Func[]) {
  return function fn(this: unknown, ...args: unknown[]) {
    if (!some(functions, isFunction)) {
      throw new TypeError('The `functions` parameter of the `compose` is not a function')
    }

    let result: unknown
    result = functions[0].apply(this, args)
    for (let i = 1, { length } = functions; i < length; i++) {
      result = functions[i].call(this, result)
    }
    return result
  }
}

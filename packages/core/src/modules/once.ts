import { before } from './before'

import type { Func } from '@sdkset/types'

/**
 * 返回一个函数，此函数只能调用给定函数一次，重复调用返回第一次调用的结果，调用给定函数时可传递参数。
 *
 * @example
 * const initialize = once(createApplication)
 * initialize()
 * initialize() // `initialize` 只能调用 `createApplication` 一次。
 *
 * @param func 给定函数
 */
export function once(func: Func) {
  return before(2, func)
}

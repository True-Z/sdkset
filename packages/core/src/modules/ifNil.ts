import { isNil } from './isNil'

import type { Func } from '@sdkset/types'

/**
 * 如果给定值是`null || undefined`，返回`def`，否则返回`value`，可以通过传入回调函数修改`value`最终返回的值。
 *
 * @example
 * ifNil(undefined, defaultValue)
 * => defaultValue
 *
 * ifNil(value, defaultValue)
 * => value
 *
 * ifNil(10, 'defaultValue', (val) => val + 1)
 * => 11
 *
 * @param value 给定值
 * @param defaultValue 默认值
 * @param valueTo value 处理回调
 */
export function ifNil<V, TDefault>(value: V, defaultValue: TDefault, valueTo?: Func<V>) {
  if (isNil(value)) {
    return defaultValue
  }
  return valueTo ? valueTo(value) : value
}

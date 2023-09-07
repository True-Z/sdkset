import { _getTag } from './_getTag'

import type { Func } from '@sdkset/types'

/**
 * 返回一个布尔值，判断给定值是否为函数。
 *
 * @example
 * isFunction(alert)
 * => true
 *
 * @param value 给定值
 */
export function isFunction(value: unknown): value is Func {
  return _getTag(value) === '[object Function]'
}

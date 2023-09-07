import { _getTag } from './_getTag'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个布尔值，判断给定值是否为`WeakMap`对象。
 *
 * @example
 * isWeakMap(new WeakMap())
 * => true
 *
 * @param value 给定值
 */
export function isWeakMap(value: unknown): value is WeakMap<Dictionary, unknown> {
  return _getTag(value) === '[object WeakMap]'
}

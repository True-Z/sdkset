import { _getTag } from './_getTag'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个布尔值，判断给定值是否为`WeakSet`（弱保持对象值集合）对象。
 *
 * @example
 * isWeakSet(new WeakSet())
 * => true
 *
 * @param value 给定值
 */
export function isWeakSet(value: unknown): value is WeakSet<Dictionary> {
  return _getTag(value) === '[object WeakSet]'
}

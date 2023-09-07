import { _getLength } from './_getLength'
import { isLength } from './isLength'

import type { List } from '@sdkset/types'

/**
 * 返回一个布尔值，判断给定值是否为类数组（存在有效`length`且不为`null || function`）。
 *
 * @example
 * isArrayLike([])
 * => true
 *
 * isArrayLike(()=>{})
 * => false
 *
 * @param value 给定值
 */
export function isArrayLike(value: unknown): value is List {
  return value != null && typeof value !== 'function' && isLength(_getLength(value))
}

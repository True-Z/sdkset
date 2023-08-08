import { _getTag } from './_getTag'
import { nativeIsArray } from './_setup'

/**
 * 返回一个布尔值，判断给定值是否为数组。
 *
 * @example
 * (function(){ return isArray(arguments); })()
 * => false
 *
 * isArray([1, 2, 3])
 * => true
 *
 * @param value 给定值
 */
export function isArray(value: unknown): value is Array<unknown> {
  if (nativeIsArray) {
    return nativeIsArray(value)
  }
  return _getTag(value) === '[object Array]'
}

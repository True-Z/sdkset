import { toString } from './_setup'

/**
 * 返回`Object.prototype.toString.call`原始值。
 *
 * @example
 * _getTag([])
 * => '[object Array]'
 *
 * @param value 给定值
 */
export function _getTag(value: unknown) {
  return toString.call(value)
}

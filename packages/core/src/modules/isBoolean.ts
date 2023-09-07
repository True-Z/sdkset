import { _getTag } from './_getTag'

/**
 * 返回一个布尔值，判断给定值是否为布尔值。
 *
 * @example
 * isBoolean(false)
 * => true
 *
 * isBoolean(Boolean())
 * => true
 *
 * isBoolean(null)
 * => false
 *
 * @param value 给定值
 */
export function isBoolean(value: unknown): value is boolean {
  return value === false || value === true || _getTag(value) === '[object Boolean]'
}

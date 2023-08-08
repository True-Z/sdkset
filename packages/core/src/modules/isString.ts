import { _getTag } from './_getTag'

/**
 * 返回一个布尔值，判断给定值是否为字符串。
 *
 * @example
 * isString("moe")
 * => true
 *
 * @param value 给定值
 */
export function isString(value: unknown): value is string {
  return _getTag(value) === '[object String]'
}

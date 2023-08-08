import { _getTag } from './_getTag'

/**
 * 返回一个布尔值，判断给定值是否为数值（包括`NaN`）。
 *
 * @example
 * isNumber(8.4 * 5)
 * => true
 *
 * @param value 给定值
 */
export function isNumber(value: unknown): value is number {
  return _getTag(value) === '[object Number]'
}

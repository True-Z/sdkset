/**
 * 返回一个布尔值，判断给定值是否为空字符串。
 *
 * @example
 * isDataView('')
 * => true
 *
 * @param value 给定值
 */
export function isBlank(value: unknown): value is string {
  return value === ''
}

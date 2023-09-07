/**
 * 返回一个布尔值，判断给定值是否为`null`。
 *
 * @example
 * isNull(null)
 * => true
 *
 * @param value 给定值
 */
export function isNull(value: unknown): value is null {
  return value === null
}

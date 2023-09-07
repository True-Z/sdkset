/**
 * 返回一个布尔值，判断给定值是否为`null || undefined`。
 *
 * @example
 * isNil(null)
 * => true
 *
 * isNil(undefined)
 * => true
 *
 * @param value 给定值
 */
export function isNil(value: unknown): value is null | undefined {
  return value == null
}

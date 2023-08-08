/**
 * 返回一个布尔值，判断给定值是否为`undefined`。
 *
 * @example
 * isUndefined(undefined)
 * => true
 *
 * @param value 给定值
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

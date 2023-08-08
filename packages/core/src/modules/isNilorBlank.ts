/**
 * 返回一个布尔值，判断给定值是否为`null || undefined || ''`。
 *
 * @example
 * isNilorBlank(null)
 * => true
 *
 * isNilorBlank(undefined)
 * => true
 *
 * isNilorBlank('')
 * => true
 *
 * @param value 给定值
 */
export function isNilorBlank(value: unknown): value is null | undefined | string {
  return value == null || value === ''
}

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个布尔值，判断给定值是否为对象。此方法判断`null`不为对象。
 *
 * @example
 * isObject({})
 * => true
 *
 * isObject(null)
 * => false
 *
 * @param value 给定值
 */
export function isObject(value: unknown): value is Dictionary {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

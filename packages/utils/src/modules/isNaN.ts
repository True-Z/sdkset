import { nativeIsNaN } from './_setup'
import { isNumber } from './isNumber'

/**
 * 返回一个布尔值，判断给定值是否为`NaN`，此方法判断`undefined`不为`NaN`。
 * 这和原生的`isNaN`函数不一样，如果给定值是`undefined`，原生的`isNaN`函数也会返回`true`。
 *
 * @example
 * isNaN(NaN)
 * => true
 *
 * isNaN(undefined)
 * => true
 *
 * isNaN(undefined)
 * => false
 *
 * @param value 给定值
 */
export function isNaN(value: unknown): value is number {
  return isNumber(value) && nativeIsNaN(value)
}

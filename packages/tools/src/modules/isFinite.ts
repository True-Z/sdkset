import { nativeIsFinite, nativeIsNaN } from './_setup'
import { isSymbol } from './isSymbol'

/**
 * 返回一个布尔值，判断给定值是否为有限数值。
 *
 * @example
 * isFinite(-101)
 * => true
 *
 * isFinite(-Infinity)
 * => false
 *
 * @param value 给定值
 */
export function isFinite(value: unknown): value is number {
  return !isSymbol(value) && nativeIsFinite(value as number) && !nativeIsNaN(parseFloat(value as string))
}

import { MAX_SAFE_INTEGER } from './_setup'

/**
 * 返回一个布尔值，判断给定值是否为`length`（`0 ~ 9007199254740991`之间的整数）。
 *
 * @example
 * isLength(1)
 * => true
 *
 * isLength(1.2)
 * => false
 *
 * isLength(9007199254740992)
 * => false
 *
 * @param value 给定值
 */
export function isLength(value: unknown): value is number {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER
}

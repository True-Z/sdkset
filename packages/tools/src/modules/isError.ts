import { _getTag } from './_getTag'

/**
 * 返回一个布尔值，判断给定值是否继承自`Error`对象。
 *
 * @example
 * try {
 *   throw new TypeError("Example")
 * } catch (o_O) {
 *   isError(o_O)
 * }
 * => true
 *
 * @param value 给定值
 */
export function isError(value: unknown): value is Error {
  return _getTag(value) === '[object Error]'
}

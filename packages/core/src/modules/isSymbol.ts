import { _getTag } from './_getTag'

/**
 * 返回一个布尔值，判断给定值是否为`Symbol`。
 *
 * @example
 * isSymbol(Symbol())
 * => true
 *
 * @param value 给定值
 */
export function isSymbol(value: unknown): value is symbol {
  return _getTag(value) === '[object Symbol]'
}

import { _getTag } from './_getTag'

/**
 * 返回一个布尔值，判断给定值是否为`arguments`对象。
 *
 * @example
 * (function(){ return isArguments(arguments) })(1, 2, 3)
 * => true
 *
 * isArguments([1, 2, 3])
 * => false
 *
 * @param value 给定值
 */
export function isArguments(value: unknown): value is IArguments {
  return _getTag(value) === '[object Arguments]'
}

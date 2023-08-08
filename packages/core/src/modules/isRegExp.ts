import { _getTag } from './_getTag'
import { nodeTypes } from './_setup'

const nodeIsRegExp = nodeTypes && nodeTypes.isRegExp

/**
 * 返回一个布尔值，判断给定值是否为`RegExp`对象。
 *
 * @example
 * isRegExp(/moe/)
 * => true
 *
 * @param value 给定值
 */
export function isRegExp(value: unknown): value is RegExp {
  if (nodeIsRegExp) {
    return nodeIsRegExp(value)
  }
  return _getTag(value) === '[object RegExp]'
}

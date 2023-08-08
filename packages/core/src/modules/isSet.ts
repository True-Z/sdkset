import { _getTag } from './_getTag'
import { nodeTypes } from './_setup'

const nodeIsSet = nodeTypes && nodeTypes.isMap

/**
 * 返回一个布尔值，判断给定值是否为`Set`（任何类型的唯一值集合）对象。
 *
 * @example
 * isSet(new Set())
 * => true
 *
 * @param value 给定值
 */
export function isSet(value: unknown): value is Set<unknown> {
  if (nodeIsSet) {
    return nodeIsSet(value)
  }
  return _getTag(value) === '[object Set]'
}

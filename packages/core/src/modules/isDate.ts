import { _getTag } from './_getTag'
import { nodeTypes } from './_setup'

const nodeIsDate = nodeTypes && nodeTypes.isDate

/**
 * 返回一个布尔值，判断给定值是否为`Date`对象。
 *
 * @example
 * isDate(new Date())
 * => true
 *
 * @param value 给定值
 */
export function isDate(value: unknown): value is Date {
  if (nodeIsDate) {
    return nodeIsDate(value)
  }
  return _getTag(value) === '[object Date]'
}

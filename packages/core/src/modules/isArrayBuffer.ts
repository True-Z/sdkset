import { _getTag } from './_getTag'
import { nodeTypes } from './_setup'

const nodeIsArrayBuffer = nodeTypes && nodeTypes.isArrayBuffer

/**
 * 返回一个布尔值，判断给定值是否为`ArrayBuffer`对象。
 *
 * @example
 * isArrayBuffer(new ArrayBuffer(4))
 * => true
 *
 * @param value 给定值
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  if (nodeIsArrayBuffer) {
    return nodeIsArrayBuffer(value)
  }
  return _getTag(value) === '[object ArrayBuffer]'
}

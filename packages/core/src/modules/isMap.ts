import { _getTag } from './_getTag'
import { nodeTypes } from './_setup'

import type { Dictionary } from '@sdkset/types'

const nodeIsMap = nodeTypes && nodeTypes.isMap

/**
 * 返回一个布尔值，判断给定值是否为`Map`对象。
 *
 * @example
 * isMap(new Map())
 * => true
 *
 * @param value 给定值
 */
export function isMap(value: unknown): value is Map<Dictionary, unknown> {
  if (nodeIsMap) {
    return nodeIsMap(value)
  }
  return _getTag(value) === '[object Map]'
}

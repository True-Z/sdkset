import { nativeIsView, nodeTypes, toString } from './_setup'
import { isArrayLike } from './isArrayLike'
import { isDataView } from './isDataView'

import type { TypedArray } from '@sdkset/types'

const reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array]$/
const nodeIsTypedArray = nodeTypes && nodeTypes.isTypedArray

/**
 * 返回一个布尔值，判断给定值是否为`TypedArray`对象。
 *
 * @example
 * isTypedArray(new Int8Array(8))
 * => true
 *
 * @param value 给定值
 */
export function isTypedArray(value: unknown): value is TypedArray {
  if (nodeIsTypedArray) {
    return nodeIsTypedArray(value)
  }
  return nativeIsView
    ? nativeIsView(value) && !isDataView(value)
    : isArrayLike(value) && reTypedTag.test(toString.call(value))
}

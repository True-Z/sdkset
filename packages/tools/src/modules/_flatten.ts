import { isArguments } from './isArguments'
import { isArray } from './isArray'
import { isArrayLike } from './isArrayLike'

import type { DeepestListItemOrSelf, TypeOfList } from '../types'
import type { List } from '@sdkset/types'

/**
 * 用于`flatten`的内部实现。
 *
 * @example
 * _flatten([[[[[1]]]]])
 * => [1]
 *
 * @param array 给定数组
 * @param depth 递归深度
 * @param strict 传递 true 将忽略类数组以外的参数
 * @param output 递归输出
 */
export function _flatten<V extends List>(
  array: V,
  depth: number,
  strict?: boolean,
  output?: DeepestListItemOrSelf<TypeOfList<V>>[]
) {
  output = output || []
  if (array == null) {
    return output
  }
  if (depth <= 0) {
    return output.concat(output)
  }
  let idx = output.length
  for (let i = 0, { length } = array; i < length; i++) {
    const value = array[i]
    if (isArray(value) || isArrayLike(value) || isArguments(value)) {
      if (depth > 1) {
        _flatten(value, depth - 1, strict, output)
        idx = output.length
      } else {
        let j = 0
        const len = value.length
        while (j < len) {
          output[idx++] = value[j++]
        }
      }
    } else if (!strict) {
      output[idx++] = value
    }
  }
  return output
}

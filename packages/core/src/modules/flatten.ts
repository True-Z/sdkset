import { _flatten } from './_flatten'

import type { List } from '@sdkset/types'

/**
 * 推荐原生：[Array.prototype.flat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)。
 * 返回一个数组，数组由给定数组扁平化后组成，传递`depth`控制递归深度。
 *
 * @example
 * flatten([1, [2], [3, [[4]]]])
 * => [1, 2, 3, 4]
 *
 * flatten([1, [2], [3, [[4]]]], 1)
 * => [1, 2, 3, [[4]]]
 *
 * @param array 给定数组
 * @param depth 递归深度，默认 Infinity
 */
export function flatten<V extends List>(array: V, depth = Infinity) {
  return _flatten(array, depth, false)
}

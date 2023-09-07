import { isArrayLike } from './isArrayLike'
import { keys } from './keys'

import type { Collection } from '@sdkset/types'

/**
 * 返回给定集合的长度。
 *
 * @example
 * size([1, 2, 3, 4, 5])
 * => 5
 *
 * size({ one: 1, two: 2, three: 3 })
 * => 3
 *
 * @param list 给定集合
 */
export function size(list: Collection) {
  if (list == null) {
    return 0
  }
  return isArrayLike(list) ? list.length : keys(list).length
}

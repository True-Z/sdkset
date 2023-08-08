import { indexOf } from './indexOf'
import { isArrayLike } from './isArrayLike'
import { isBoolean } from './isBoolean'
import { isNumber } from './isNumber'
import { values } from './values'

import type { Collection } from '@sdkset/types'

/**
 * 返回一个布尔值，判断给定集合是否包含指定的`value`（使用===检测）。
 *
 * @example
 * contains([1, 2, 3], 3)
 * => true
 *
 * contains({ a: 1, b: 2, c: 3 }, 3)
 * => true
 *
 * @param list 给定集合
 * @param value 给定值
 * @param fromIndex 起始索引，传递 true 将采用二分查找（需数据已升序）
 */
export function contains(list: Collection, value?: unknown, fromIndex?: number | boolean) {
  if (!isNumber(fromIndex) && !isBoolean(fromIndex)) {
    fromIndex = 0
  }
  if (isArrayLike(list)) {
    return indexOf(list, value, fromIndex) !== -1
  }
  return indexOf(values(list), value, fromIndex) !== -1
}

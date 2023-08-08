import { slice } from './_setup'
import { isNaN } from './isNaN'

import type { TypeOfList } from '../types'
import type { Func, List } from '@sdkset/types'

/**
 * 用于创建`indexOf`、`lastIndexOf`的内部函数。
 *
 * @example
 * _createIndexFinder(1, findIndex, sortedIndex)
 * => indexOf
 *
 * _createIndexFinder(1, findLastIndex)
 * => lastIndexOf
 *
 *
 * @param dir 1：从左至右 -1：从右至左
 * @param predicateFind 谓词函数
 * @param sortedIndex 排序函数
 */

export function _createIndexFinder(dir: 1 | -1, predicateFind: Func<number>, sortedIndex?: Func<number>) {
  return function fn<V extends List>(array: V, value?: TypeOfList<V>, isSortedOrFromIndex?: number | boolean) {
    if (array == null) {
      return -1
    }
    let i = 0
    let { length } = array
    if (typeof isSortedOrFromIndex === 'number') {
      if (dir > 0) {
        i = isSortedOrFromIndex >= 0 ? isSortedOrFromIndex : Math.max(isSortedOrFromIndex + length, i)
      } else {
        length = isSortedOrFromIndex >= 0 ? Math.min(isSortedOrFromIndex + 1, length) : isSortedOrFromIndex + length + 1
      }
    } else if (sortedIndex && isSortedOrFromIndex && length) {
      const findIdx = sortedIndex(array, value)
      return array[findIdx] === value ? findIdx : -1
    }
    if (isNaN(value)) {
      isSortedOrFromIndex = predicateFind(slice.call(array, i, length), isNaN)
      return isSortedOrFromIndex >= 0 ? isSortedOrFromIndex : -1
    }
    for (
      isSortedOrFromIndex = dir > 0 ? i : length - 1;
      isSortedOrFromIndex >= 0 && isSortedOrFromIndex < length;
      isSortedOrFromIndex += dir
    ) {
      if (array[isSortedOrFromIndex] === value) {
        return isSortedOrFromIndex
      }
    }
    return -1
  }
}

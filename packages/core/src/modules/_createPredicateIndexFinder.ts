import { _cb } from './_cb'

import type { Iteratee } from '../types'
import type { List } from '@sdkset/types'

/**
 * 用于创建`findIndex`、`findLastIndex`的内部函数。
 *
 * @example
 * _createPredicateIndexFinder(1)
 * => findIndex
 *
 * _createPredicateIndexFinder(-1)
 * => findLastIndex
 *
 * @param dir 1：从左至右 -1：从右至左
 */
export function _createPredicateIndexFinder(dir: 1 | -1) {
  return function fn<V extends List>(array: V, predicate?: Iteratee<V, boolean>, context?: unknown) {
    if (array == null) {
      return -1
    }
    const cb = _cb(predicate, context)
    const { length } = array
    let index = dir > 0 ? 0 : length - 1
    for (; index >= 0 && index < length; index++) {
      if (cb(array[index], index, array)) {
        return index
      }
    }
    return -1
  }
}

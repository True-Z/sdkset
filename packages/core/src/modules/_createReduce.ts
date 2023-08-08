import { isArrayLike } from './isArrayLike'
import { isObject } from './isObject'
import { keys } from './keys'

import type { MemoCollectionIterator, TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 用于创建`reduce`、`reduceRight`的内部函数。
 *
 * @example
 * _createReduce(1)
 * => reduce
 *
 * _createReduce(-1)
 * => reduceRight
 *
 * @param dir 1：从左至右 -1：从右至左
 */
export function _createReduce(dir: 1 | -1) {
  const reduce = function fn<V extends Collection, TResult = TypeOfCollection<V>>(
    list: V,

    iteratee: MemoCollectionIterator<TypeOfCollection<V>, TResult>,
    memo: TResult,
    initial?: boolean
  ) {
    const _keys = !isArrayLike(list) && keys(list)
    const { length } = _keys || list
    let index = dir > 0 ? 0 : length - 1
    if (!initial) {
      if (isArrayLike(list)) {
        memo = list[index]
      } else if (isObject(list) && _keys) {
        memo = list[_keys[index]]
      }
      index += dir
    }
    if (isArrayLike(list)) {
      for (; index >= 0 && index < length; index += dir) {
        memo = iteratee(memo, list[index], index, list)
      }
    } else if (isObject(list) && _keys) {
      for (; index >= 0 && index < length; index += dir) {
        const currentKey = _keys[index]
        memo = iteratee(memo, list[currentKey], currentKey, list)
      }
    }
    return memo
  }

  return function fn<V extends Collection, TResult = TypeOfCollection<V>>(
    list: V,
    iteratee: MemoCollectionIterator<TypeOfCollection<V>, TResult>,
    memo?: TResult
  ) {
    const initial = arguments.length >= 3
    return reduce(list, iteratee, memo as TResult, initial)
  }
}

import { isArrayLike } from './isArrayLike'
import { random } from './random'
import { swap } from './swap'
import { toArray } from './toArray'
import { values } from './values'

import type { TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定集合随机萃取的`n`个元素组成。
 *
 * @example
 * sample([1, 2, 3, 4, 5, 6])
 * => 4
 *
 * sample([1, 2, 3, 4, 5, 6], 3)
 * => [1, 6, 2]
 *
 * @param list 给定集合
 * @param n 萃取数量
 */
export function sample<V extends Collection>(list: V, n?: number): TypeOfCollection<V>[] {
  if (list == null) {
    return []
  }
  if (n == null) {
    if (!isArrayLike(list)) {
      return [list[random(values(list).length - 1)]]
    }
    return [list[random(list.length - 1)]]
  }
  const results = toArray(list)
  const { length } = results
  n = Math.max(Math.min(n, length), 0)
  const last = length - 1
  for (let i = 0; i < n; i++) {
    const rand = random(i, last)
    swap(results, i, rand)
  }
  return results.slice(0, n)
}

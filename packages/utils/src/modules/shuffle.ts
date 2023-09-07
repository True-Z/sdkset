import { sample } from './sample'

import type { TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定集合使用`Fisher-Yates shuffle`处理后组成.
 *
 * @example
 * shuffle([1, 2, 3, 4, 5, 6])
 * => [4, 1, 6, 3, 5, 2]
 *
 * @param list 给定集合
 */
export function shuffle<V extends Collection>(list: V) {
  return sample(list, Infinity) as TypeOfCollection<V>
}

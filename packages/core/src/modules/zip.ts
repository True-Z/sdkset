import { unzip } from './unzip'

import type { List } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定数组集合按索引分组汇总组成。
 *
 * @example
 * zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])
 * => [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]
 *
 * @param arrays 给定数组集合
 */
export function zip<V extends List>(...arrays: V[]) {
  return unzip(arrays)
}

import { contains } from './contains'
import { filter } from './filter'

import type { List } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定数组与`values`进行差集运算后组成（使用`===`表达式做相等测试）。
 *
 * @example
 * difference([1, 2, 1, 0, 3, 1, 4], 0, 1)
 * => [2, 3, 4]
 *
 * difference([1, 2, 3, 4, 5], [2, 3], [4])
 * => [1, 5]
 *
 * @param array 给定数组
 * @param values 任意值的集合
 */
export function difference<V extends List>(array: V, ...values: unknown[]) {
  values = values.flat()
  return filter(array, (value) => !contains(values, value))
}

import { map } from './map'
import { property } from './property'

import type { PropertyTypeOrAny, TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定集合的萃取属性值组成，`map`最常使用的用例模型的简化版本。
 *
 * @example
 * const stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }]
 * pluck(stooges, 'name')
 * => ['moe', 'larry', 'curly']
 *
 * @param list 给定集合
 * @param key 萃取属性
 */
export function pluck<V extends Collection, K extends string | number>(list: V, key: K) {
  return map(list, property(key)) as PropertyTypeOrAny<TypeOfCollection<V>, K>[]
}

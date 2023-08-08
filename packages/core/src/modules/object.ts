import { nativeFromEntries } from './_setup'

import type { PairValue, TypeOfList } from '../types'
import type { Dictionary, List } from '@sdkset/types'

/**
 * 推荐原生：[Object.fromEntries](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)。
 * 返回一个对象，对象由给定键-值对数组转换后组成。`entries`的反函数。如果存在重复键，最后一个值将被返回。
 *
 * @example
 * object([['moe', 30], ['larry', 40], ['curly', 50]])
 * => {moe: 30, larry: 40, curly: 50}
 *
 * @param array 给定键-值对数组
 */
export function object<V extends List<List>>(array: V): Dictionary<PairValue<TypeOfList<V>>> {
  const result: Dictionary = {}
  if (array == null) {
    return result
  }
  if (nativeFromEntries) {
    return nativeFromEntries(array)
  }
  for (let i = 0, { length } = array; i < length; i++) {
    const [value, key] = array[i]
    result[key] = value
  }
  return result
}

import { nativeEntries } from './_setup'
import { keys } from './keys'

import type { TypeOfDictionary } from '../types'
import type { Dictionary } from '@sdkset/types'

/**
 * 推荐原生：[Object.entries](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)。
 * 返回一个数组，数组由给定对象自身可枚举属性的键-值对组成，其排列与使用`for...in`循环遍历该对象时返回的顺序一致（区别在于`for-in`循环还会枚举原型链中的属性）。`object`的反函数。
 *
 * @example
 * entries({ one: 1, two: 2, three: 3 })
 * => [['one', 1], ['two', 2], ['three', 3]]
 *
 * @param object 给定对象
 */
export function entries<V extends Dictionary>(object: V) {
  if (object == null) {
    return []
  }
  if (nativeEntries) {
    return nativeEntries(object) as [string, TypeOfDictionary<V>][]
  }
  const _keys = keys(object)
  const { length } = _keys
  const results: [string, TypeOfDictionary<V>][] = []
  for (let i = 0; i < length; i++) {
    results[i] = [_keys[i], object[_keys[i]]]
  }
  return results
}

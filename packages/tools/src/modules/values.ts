import { nativeValues } from './_setup'
import { isObject } from './isObject'
import { keys } from './keys'

import type { TypeOfDictionary } from '../types'
import type { Dictionary } from '@sdkset/types'

/**
 * 推荐原生：[Object.values](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values)。
 * 返回一个数组，数组由给定对象自有可枚举字符串键属性值组成。
 *
 * @example
 * values({ one: 1, two: 2, three: 3 })
 * => [1, 2, 3]
 *
 * @param object 给定对象
 */
export function values<V extends Dictionary>(object: V): TypeOfDictionary<V>[] {
  if (!isObject(object)) {
    return []
  }
  if (nativeValues) {
    return nativeValues(object)
  }
  const _keys = keys(object)
  const { length } = _keys
  const results = []
  for (let i = 0; i < length; i++) {
    results[i] = object[_keys[i]]
  }
  return results
}

import { _has } from './_has'
import { nativeKeys } from './_setup'
import { isObject } from './isObject'

import type { Dictionary } from '@sdkset/types'

/**
 * 推荐原生：[Object.keys](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)。
 * 返回一个数组，数组由给定对象自身可枚举的字符串键属性名组成。
 *
 * @example
 * keys({ one: 1, two: 2, three: 3 })
 * => ['one', 'two', 'three']
 *
 * @param object 给定对象
 */
export function keys(object: Dictionary) {
  if (!isObject(object)) {
    return []
  }
  if (nativeKeys) {
    return nativeKeys(object)
  }
  const results: string[] = []
  for (const key in object) {
    if (_has(object, key)) {
      results.push(key)
    }
  }
  return results
}

import { _has } from './_has'
import { _toPath } from './_toPath'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个布尔值，判断给定对象自身属性中是否具有指定的路径属性（暨是否有指定的键）。
 * 等同于`object.hasOwnProperty(key)`，这是使用[Object.prototype.hasOwnProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)函数的一个安全引用（此函数可能被意外覆盖）。
 *
 * @example
 * has({ a: 1, b: 2, c: { d: 3 } }, ['c', 'd'])
 * => true
 *
 * has({ a: 1, b: 2, c: { d: 3 } }, 'c.d')
 * => true
 *
 * @param object 给定对象
 * @param path 检索路径
 */
export function has(object: Dictionary, path: unknown) {
  const paths = _toPath(path)
  const { length } = paths
  for (let i = 0; i < length; i++) {
    const key = paths[i]
    if (!_has(object, key)) {
      return false
    }
    object = object[key]
  }
  return !!length
}

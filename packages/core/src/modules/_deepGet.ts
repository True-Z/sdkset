import type { TypeOfDictionary } from '../types'
import type { Dictionary } from '@sdkset/types'

/**
 * 用于`get`、`invoke`、`property`的内部实现。
 *
 * @example
 * _deepGet({a: {b: {c: {d: 1}}}}, a.b.c.d)
 * => 1
 *
 * _deepGet({a: {b: {c: {d: 1}}}}, [a, b, c, d])
 * => 1
 *
 * @param object 给定对象
 * @param path 检索路径
 */
export function _deepGet<V extends Dictionary>(object: V, path: string[]) {
  if (object == null) {
    return
  }
  const { length } = path
  for (let i = 0; i < length; i++) {
    object = object[path[i]] as TypeOfDictionary<V>
  }
  return length ? object : undefined
}

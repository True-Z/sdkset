import { _deepGet } from './_deepGet'
import { _toPath } from './_toPath'
import { ifNil } from './ifNil'

import type { TypeOfDictionary } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 返回给定对象指定`path`（使用`toPath`转换）键的值，如果指定键不存在则返回`defaultValue`。
 *
 * @example
 * const stooge = { name: 'moe' }
 * get(stooge, 'name')
 * => 'moe'
 *
 * @param object 给定对象
 * @param path 检索路径
 * @param defaultValue 默认值
 */
export function get<V extends Collection, U>(object: V, path: unknown, defaultValue?: U) {
  const value = _deepGet(object, _toPath(path))
  return ifNil(value, defaultValue) as TypeOfDictionary<V> | U
}

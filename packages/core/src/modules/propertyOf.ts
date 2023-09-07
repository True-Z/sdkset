import { get } from './get'
import { noop } from './noop'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个函数，该函数返回指定检索路径属性给定对象的值（先对象后路径），`property`的反函数。
 *
 * @example
 * const stooge = { name: 'moe' }
 * propertyOf(stooge)('name')
 * => 'moe'
 *
 * @param object 给定对象
 */
export function propertyOf(object: Dictionary) {
  if (object == null) {
    return noop
  }
  return function fn(path: number | string | (number | string)[]) {
    return get(object, path)
  }
}

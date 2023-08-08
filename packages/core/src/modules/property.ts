import { _deepGet } from './_deepGet'
import { _toPath } from './_toPath'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个函数，该函数将返回指定对象的给定检索路径属性（先路径后对象）。`path`可以指定为简单的`key`，或者指定为对象键或索引键组成的数组，用于深度属性萃取。
 *
 * @example
 * const stooge = { name: 'moe' }
 * 'moe' === property('name')(stooge)
 * => true
 *
 * const stooges = { moe: { fears: { worst: 'Spiders' } }, curly: { fears: { worst: 'Moe' } } }
 * const curlsWorstFear = property(['curly', 'fears', 'worst'])
 * curlsWorstFear(stooges)
 * => 'Moe'
 *
 * @param path 给定检索路径
 */
export function property(path: unknown) {
  return function fn(obj: Dictionary) {
    return _deepGet(obj, _toPath(path))
  }
}

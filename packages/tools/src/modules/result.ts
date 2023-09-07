import { _toPath } from './_toPath'
import { isFunction } from './isFunction'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回给定对象检索路径属性值，如果属性值是函数，则在给定对象上下文调用并返回值，其余类型直接返回。
 * 未检索到属性值情况下，如果传入了`callBackOrDefault`参数且为回调函数时，在给定对象上下文调用并返回值，其余类型作为默认值返回，
 *
 * @example
 * const object = { cheese: 'crumpets', stuff: function() { return 'nonsense' } }
 * result(object, 'cheese')
 * => 'crumpets'
 *
 * result(object, 'stuff')
 * => 'nonsense'
 *
 * result(object, 'meat', 'ham')
 * => 'ham'
 *
 * @param object 给定对象
 * @param path 检索路径
 * @param callBackOrDefault 回调函数 or 默认值
 */
export function result(object: Dictionary, path?: string | string[], callBackOrDefault?: unknown) {
  const paths = _toPath(path)
  const { length } = paths
  if (!length) {
    return isFunction(callBackOrDefault) ? callBackOrDefault.call(object) : callBackOrDefault
  }
  for (let i = 0; i < length; i++) {
    let prop = object == null ? undefined : object[paths[i]]
    if (prop === undefined) {
      prop = callBackOrDefault
      i = length
    }
    object = isFunction(prop) ? prop.call(object) : prop
  }
  return object
}

import { extend } from './extend'
import { forEach } from './forEach'
import { isFunction } from './isFunction'
import { isObject } from './isObject'
import { keys } from './keys'

import type { Dictionary, New } from '@sdkset/types'

/**
 * 用于创建`clone`、`cloneDeep`的内部函数。
 *
 * @example
 * _createClone({{ ... }}, false)
 * => clone
 *
 * _createClone({{ ... }}, true)
 * => cloneDeep
 *
 * @param value 给定拷贝值
 * @param deep 是否为深拷贝
 * @param stack 解决循环引用
 */
export function _createClone<V>(value: V, deep?: boolean, stack = new WeakMap()) {
  if (!isObject(value)) {
    return value
  }
  if (isFunction(value)) {
    return {}
  }
  const isArr = Array.isArray(value)
  if (!deep) {
    if (isArr) {
      return value.slice()
    }
    return extend({}, value)
  }

  const target = new (value.constructor as New<Dictionary>)()
  if (stack.has(value)) {
    return stack.get(value)
  }
  stack.set(value, target)

  if (isArr) {
    forEach(value, (subValue, index) => {
      target[index] = _createClone(subValue, deep, stack)
    })
  } else {
    const _keys = keys(value)
    forEach(_keys, (key) => {
      target[key] = _createClone(value[key], deep, stack)
    })
  }
  return target
}

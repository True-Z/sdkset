import { nativeCreate } from './_setup'
import { isObject } from './isObject'

import type { New } from '@sdkset/types'

/**
 * `_.create`内部函数。
 *
 * @example
 * _baseCreate({ ... });
 * => { ... }.__proto__ === { ... }
 *
 * @param prototype 给定原型对象
 */
export function _baseCreate(prototype: unknown) {
  if (!isObject(prototype)) {
    return {}
  }
  if (nativeCreate) {
    return nativeCreate(prototype)
  }
  const Ctor = ctor()
  Ctor.prototype = prototype
  const result = new (Ctor as unknown as New)()
  Ctor.prototype = null
  return result
}

function ctor() {
  return function fn() {
    // 为代理原型交换继承创建一个裸函数引用。
    // Create a naked function reference for surrogate-prototype-swapping.
  }
}

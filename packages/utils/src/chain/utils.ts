// import { observer } from './observer'

import type { OmitUtils } from './types'
import type { Dictionary, New } from '@sdkset/types'

/**
 * 返回`utils`包装器对象，如果`utils`作为函数调用，它将返回一个可以使用`OO-style`的包装器，通过`mixin`方法混入的自定义函数可以被链接使用。
 *
 * @example
 * utils(obj)
 * => { _wrapped: obj, ... }
 *
 * @param value 给定值
 */
export function utils<V>(this: unknown, value?: V): OmitUtils<V> {
  // observer.emit('mountDefaultFunction')

  if (value instanceof utils) {
    return value as unknown as OmitUtils<V>
  }
  if (!(this instanceof utils)) {
    return new (utils as unknown as New<OmitUtils<V>>)(value)
  }
  ;(<Dictionary>this)._wrapped = value
  return undefined as unknown as OmitUtils<V>
}

/** 返回被包装值。 */
utils.prototype.value = function fn() {
  return this._wrapped
}
/** 返回被包装值。 */
utils.prototype.vallueOf = utils.prototype.value
/** 返回被包装值。 */
utils.prototype.toJSON = utils.prototype.value
/** 返回被包装值的字符串原始值。 */
utils.prototype.toString = function fn() {
  return String(this._wrapped)
}

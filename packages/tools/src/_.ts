import { observer } from './observer'

import type { OmitCore } from './modulesTypes'
import type { Dictionary, New } from '@sdkset/types'

/**
 * 返回`_`包装器对象，如果`_`作为函数调用，它将返回一个可以使用`OO-style`的包装器，通过`mixin`方法包装的自定义函数对象可以被链接使用。
 *
 * @example
 * _(obj)
 * => { _wrapped: obj, ... }
 *
 * @param value 给定值
 */
export function _<V>(this: unknown, value?: V): OmitCore<V> {
  observer.emit('mountDefaultFunction')

  if (value instanceof _) {
    return value as unknown as OmitCore<V>
  }
  if (!(this instanceof _)) {
    return new (_ as unknown as New<OmitCore<V>>)(value)
  }
  ;(<Dictionary>this)._wrapped = value
  return undefined as unknown as OmitCore<V>
}

/** 返回被包装值。 */
_.prototype.value = function fn() {
  return this._wrapped
}
/** 返回被包装值。 */
_.prototype.vallueOf = _.prototype.value
/** 返回被包装值。 */
_.prototype.toJSON = _.prototype.value
/** 返回被包装值的字符串原始值。 */
_.prototype.toString = function fn() {
  return String(this._wrapped)
}

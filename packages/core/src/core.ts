import type { OmitCore } from './modulesTypes'
import type { Dictionary, New } from '@sdkset/types'

/**
 * 返回`core`包装器对象，如果`core`作为函数调用，它将返回一个可以使用`OO-style`的包装器，通过`mixin`方法包装的自定义函数对象可以被链接使用。
 *
 * @example
 * core(obj)
 * => { _wrapped: obj, ... }
 *
 * @param value 给定值
 */
export function core<V>(this: unknown, value?: V): OmitCore<V> {
  if (value instanceof core) {
    return value as unknown as OmitCore<V>
  }
  if (!(this instanceof core)) {
    return new (core as unknown as New<OmitCore<V>>)(value)
  }
  ;(<Dictionary>this)._wrapped = value
  return undefined as unknown as OmitCore<V>
}

/** 返回被包装值 */
core.prototype.value = function fn() {
  return this._wrapped
}
/** 返回被包装值 */
core.prototype.vallueOf = core.prototype.value
/** 返回被包装值 */
core.prototype.toJSON = core.prototype.value
/** 返回被包装值的字符串原始值 */
core.prototype.toString = function fn() {
  return String(this._wrapped)
}

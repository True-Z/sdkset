import { ObjectProto } from './_setup'

/**
 * 返回一个布尔值，判断给定值是否为原型对象（拥有一个非空原型的隐式引用）。
 *
 * @example
 * function custom() {}
 * isPrototype(custom.prototype)
 * => true
 *
 * @param value 给定值
 */
export function isPrototype(value: unknown): value is object {
  const ctor = value && value.constructor
  const proto = (typeof ctor === 'function' && ctor.prototype) || ObjectProto
  return value === proto
}

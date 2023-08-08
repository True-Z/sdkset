import { _has } from './_has'
import { nativeKeys } from './_setup'
import { isArguments } from './isArguments'
import { isArray } from './isArray'
import { isArrayLike } from './isArrayLike'
import { isMap } from './isMap'
import { isPrototype } from './isPrototype'
import { isSet } from './isSet'
import { isString } from './isString'
import { isTypedArray } from './isTypedArray'

/**
 * 返回一个布尔值，判断给定值是否不包含任何值（没有可枚举的属性）。
 * 对于字符串和类数组`arrayLike`对象，如果`length`属性为`0`，那么`isEmpty`检查返回`true`。
 * 对于`Map`和`Set`对象，如果`size`属性为`0`，那么`isEmpty`检查返回`true`。
 *
 * @example
 * isEmpty([1, 2, 3])
 * => false
 *
 * isEmpty({})
 * => true
 *
 * @param value 给定值
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true
  }
  if (isArrayLike(value) && (isArray(value) || isString(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length
  }
  if (isMap(value) || isSet(value)) {
    return !value.size
  }
  if (isPrototype(value)) {
    return !nativeKeys(value).length
  }
  for (const key in value) {
    if (_has(value, key)) {
      return false
    }
  }
  return true
}

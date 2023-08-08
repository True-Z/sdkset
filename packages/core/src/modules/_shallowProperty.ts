import type { Dictionary } from '@sdkset/types'

/**
 * 用于`getByteLength`、`getLength`的内部实现。
 *
 * @example
 * _shallowProperty('byteLength')
 * => _getByteLength
 *
 * _shallowProperty('length')
 * => _getLength
 *
 * @param key 指定键
 */
export function _shallowProperty(key: string) {
  return function fn(object: Dictionary) {
    return object == null ? undefined : object[key]
  }
}

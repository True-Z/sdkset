import type { Dictionary } from '@sdkset/types'

/**
 * 用于`pick`的内部实现。
 *
 * @example
 * _keyInObj(1, a, {a: 1})
 * => true
 *
 * @param value
 * @param object 给定对象
 * @param key 指定键
 */
export function _keyInObj(value: unknown, key: string, object: Dictionary) {
  return key in object
}

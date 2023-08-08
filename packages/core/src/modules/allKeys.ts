import { isObject } from './isObject'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定对象自身的、继承的、可枚举的字符串键属性名组成。
 *
 * @example
 * function Stooge(name) {
 *   this.name = name
 * }
 * Stooge.prototype.silly = true
 * allKeys(new Stooge('Moe'))
 * => ['name', 'silly']
 *
 * @param object 给定对象
 */
export function allKeys(object: Dictionary) {
  const results: string[] = []
  if (!isObject(object)) {
    return results
  }
  for (const key in object) {
    results.push(key)
  }
  return results
}

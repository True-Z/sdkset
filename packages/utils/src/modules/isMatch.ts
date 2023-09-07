import { keys } from './keys'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个布尔值，判断给定对象是否包含`properties`键-值对。
 *
 * @example
 * var stooge = {name: 'moe', age: 32}
 * isMatch(stooge, {age: 32})
 * => true
 *
 * @param object 给定对象
 * @param properties 谓语对象
 */
export function isMatch(object: unknown, properties: Dictionary) {
  const _keys = keys(properties)
  const { length } = _keys
  if (object == null) {
    return !length
  }
  const obj = Object(object)
  for (let i = 0; i < length; i++) {
    const key = _keys[i]
    if (properties[key] !== obj[key] || !(key in obj)) {
      return false
    }
  }
  return true
}

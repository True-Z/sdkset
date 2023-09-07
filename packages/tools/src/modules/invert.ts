import { keys } from './keys'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个对象，对象由给定对象键（keys）和值（values）互换后组成。对于这个操作，必须确保给定对象里所有的值都是唯一的且可以序列化成字符串。
 *
 * @example
 * invert({ Moe: 'Moses', Larry: 'Louis', Curly: 'Jerome' })
 * => { Moses: 'Moe', Louis: 'Larry', Jerome: 'Curly' }
 *
 * @param object 给定对象
 */
export function invert(object: Dictionary) {
  if (object == null) {
    return {}
  }
  const _keys = keys(object)
  const results: Dictionary = {}
  for (let i = 0, { length } = _keys; i < length; i++) {
    results[object[_keys[i]] as string] = _keys[i]
  }
  return results
}

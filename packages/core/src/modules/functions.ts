import { isFunction } from './isFunction'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定对象中类型为`function`的键组成。
 *
 * @example
 * functions(_)
 * => ['all', 'unknown', 'bind', 'bindAll', 'clone', 'compact', 'compose' ...]
 *
 * @param object 给定对象
 */
export function functions(object: Dictionary) {
  if (object == null) {
    return []
  }
  const names: string[] = []
  for (const key in object) {
    if (isFunction(object[key])) {
      names.push(key)
    }
  }
  return names
}

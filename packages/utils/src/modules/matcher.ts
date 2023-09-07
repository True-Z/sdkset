import { extendOwn } from './extendOwn'
import { isMatch } from './isMatch'

import type { Dictionary } from '@sdkset/types'

/**
 * 返回一个函数，函数判断给定对象是否匹配`properties`键-值对。
 *
 * @example
 * const ready = matcher({ selected: true, visible: true })
 * filter(list, ready)
 * => [ ... ]
 *
 * @param properties 谓语对象
 */
export function matcher<V extends Dictionary>(properties: V) {
  properties = extendOwn({}, properties)
  return function fn(object: unknown) {
    return isMatch(object, properties)
  }
}

import { slice } from './_setup'
import { identity } from './identity'
import { isArray } from './isArray'
import { isArrayLike } from './isArrayLike'
import { isString } from './isString'
import { map } from './map'
import { values } from './values'

import type { TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

const reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g

/**
 * 返回一个数组，数组由给定值转换而成，在转换`arguments`对象时非常有用。
 *
 * @example
 * (function(){ return toArray(arguments).slice(1) })(1, 2, 3, 4)
 * => [2, 3, 4]
 *
 * @param list 给定值
 */
export function toArray<V extends Collection>(list: V): TypeOfCollection<V>[] {
  if (!list) {
    return []
  }
  if (isArray(list)) {
    return slice.call(list)
  }
  if (isString(list)) {
    return (list.match(reStrSymbol) || []) as TypeOfCollection<V>[]
  }
  if (isArrayLike(list)) {
    return map(list, identity) as TypeOfCollection<V>[]
  }
  return values(list) as TypeOfCollection<V>[]
}

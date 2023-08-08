import { hasOwnProperty } from './_setup'

import type { Dictionary } from '@sdkset/types'

/**
 * 用于`allKeys`、`keys`、`countBy`、`groupBy`、`has`、`isEmpty`的内部实现。
 *
 * @example
 * _has({a: 1}, 'a')
 * => true
 *
 * @param object 给定对象
 * @param key 检索键
 */
export function _has(object: Dictionary, key: string) {
  return object != null && hasOwnProperty.call(object, key)
}

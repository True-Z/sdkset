import { _cb } from './_cb'
import { forEach } from './forEach'

import type { Iteratee } from '../types'
import type { Collection, Dictionary } from '@sdkset/types'

/**
 * 用于创建`countBy`、`groupBy`、`indexBy`、`partition`的内部函数。
 *
 * @example
 * _group(func)
 * => countBy
 * => groupBy
 * => indexBy
 *
 * _group(func, true)
 * => partition
 *
 * @param behavior 给定实现函数
 * @param partition partition 创建标识
 */
export function _group(behavior: (object: Dictionary, value: unknown, key: string) => unknown, partition?: boolean) {
  return function fn<V extends Collection, I extends Iteratee<V, unknown>>(list: V, iteratee?: I, context?: unknown) {
    const result = partition ? [[], []] : {}
    const cb = _cb(iteratee, context)
    forEach(list, (value, index) => {
      const key = cb(value, index, list)
      behavior(result, value, key)
    })
    return result
  }
}

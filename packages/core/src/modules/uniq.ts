import { _cb } from './_cb'
import { contains } from './contains'

import type { Iteratee, TypeOfList } from '../types'
import type { List } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定数组的并集组成，使用`===`做相等测试。
 * 如果要处理对象元素, 需要传递`iteratee`函数来获取要对比的属性。
 *
 * @example
 * uniq([1, 2, 1, 4, 1, 3])
 * => [1, 2, 4, 3]
 *
 * @param array 给定数组
 * @param isSorted 是否启用更快的算法（数组已升序）
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export function uniq<V extends List, I extends Iteratee<V, unknown>>(
  array: V,
  isSorted?: boolean,
  iteratee?: I,
  context?: unknown
): TypeOfList<V>[] {
  if (array == null) {
    return []
  }
  let seen = []
  const results = []
  const cb = _cb(iteratee, context)
  for (let i = 0, { length } = array; i < length; i++) {
    const value = array[i]
    const computed = cb ? cb(value, i, array) : value
    if (isSorted) {
      if (!i || seen !== computed) {
        results.push(value)
      }
      seen = computed
    } else if (iteratee) {
      if (!contains(seen, computed)) {
        seen.push(computed)
        results.push(value)
      }
    } else if (!contains(results, value)) {
      results.push(value)
    }
  }
  return results
}

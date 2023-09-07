import { isArrayLike } from './isArrayLike'
import { isObject } from './isObject'

import type { Collection } from '@sdkset/types'

/**
 * 将给定集合中两个给定键的值进行互换。
 *
 * @example
 * var arr = [1, 2]
 * swap(arr, 0, 1);
 * => [2, 1]
 *
 * var obj = {pid: 1, uid: 2}
 * swap(obj, 'pid', 'uid')
 * => {pid: 2, uid: 1}
 *
 * @param list 给定集合
 * @param leftKey 需交换值的键
 * @param rightKey 需交换值的键
 */
export function swap<V extends Collection>(list: V, leftKey: number | string, rightKey: number | string) {
  if (isArrayLike(list)) {
    ;[list[+rightKey], list[+leftKey]] = [list[+leftKey], list[+rightKey]]
  } else if (isObject(list)) {
    const temp = list[leftKey]
    list[leftKey] = list[rightKey]
    list[rightKey] = temp
  }
}

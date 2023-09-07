import { _optimizeCb } from './_optimizeCb'
import { isArrayLike } from './isArrayLike'
import { isObject } from './isObject'
import { keys } from './keys'

import type { CollectionIterator, TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 数组推荐原生：[Array.prototype.forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)。
 * 返回给定集合，遍历给定集合为每个元素执行一次`iteratee`函数。
 * 每次调用`iteratee`都会传递三个参数：`(element, index, list)`，可以通过返回`false`提前结束遍历。
 * 函数能在数组、对象、类数组对象，比如`arguments`，`NodeList`和类似的数据类型上正常工作。
 * 但是它通过鸭子类型工作，所以要避免传递带有一个数值类型`length`属性的对象。
 *
 *
 * @example
 * forEach([1, 2, 3], alert);
 * => alert 1 2 3
 *
 * forEach({ one: 1, two: 2, three: 3 }, alert);
 * => alert 1 2 3
 *
 * @param list 给定集合
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export function forEach<V extends Collection>(
  list: V,
  iteratee?: CollectionIterator<TypeOfCollection<V>, void | boolean>,
  context?: unknown
) {
  const cb = _optimizeCb(iteratee, context)
  if (isArrayLike(list)) {
    for (let i = 0, { length } = list; i < length; i++) {
      if (cb(list[i], i, list) === false) {
        break
      }
    }
  } else if (isObject(list)) {
    const _keys = keys(list)
    for (let i = 0, { length } = _keys; i < length; i++) {
      if (cb(list[_keys[i]], _keys[i], list) === false) {
        break
      }
    }
  }
  return list
}

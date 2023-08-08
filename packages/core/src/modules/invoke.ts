import { _deepGet } from './_deepGet'
import { _toPath } from './_toPath'
import { isFunction } from './isFunction'
import { map } from './map'

import type { Collection, Func } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定集合中每个元素执行`method`的返回值组成，传递`args`则作为`method`调用时的参数。
 * `method`传递数组情况下，最后一位为方法名，其余为检索路径。
 *
 * @example
 * invoke([[5, 1, 7], [3, 2, 1]], Array.prototype.srot)
 * => [[1, 5, 7], [1, 2, 3]]
 *
 * invoke([[5, 1, 7], [3, 2, 1]], 'sort')
 * => [[1, 5, 7], [1, 2, 3]]
 *
 * @param list 给定集合
 * @param method 函数 or '函数名' or ['函数调用路径', '函数名']
 * @param args 调用时传递的参数
 */
export function invoke(list: Collection, method: Func | string | string[], ...args: unknown[]) {
  let contextPath: string[]
  let func: Func | string
  let pathArr: string[]
  let path: string
  if (isFunction(method)) {
    func = method
  } else {
    pathArr = _toPath(method)
    contextPath = pathArr.slice(0, -1)
    path = pathArr[pathArr.length - 1]
  }
  return map(list, (context) => {
    if (!func) {
      if (contextPath && contextPath.length) {
        context = _deepGet(context, contextPath)
      }
      if (context == null) {
        return
      }
      func = context[path]
    }
    if (isFunction(func)) {
      return func.apply(context, args)
    }
  })
}

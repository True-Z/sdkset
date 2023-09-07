import { entries } from './entries'
import { forEach } from './forEach'
import { isArrayLike } from './isArrayLike'
import { isObject } from './isObject'

/**
 * 返回一个请求参数字符串（key=value&），字符串由给定值转换而成。
 *
 * @example
 * toParams({ id: 1, sex: 1 })
 * => 'id=1&sex=1'
 *
 * toParams([[id, 1], [sex: 1]])
 * => 'id=1&sex=1'
 *
 * @param list 给定值
 */
export function toParams<V>(list: V) {
  if (list == null) {
    return ''
  }
  let paramsStr = ''
  if (isArrayLike(list)) {
    forEach(list, (item) => {
      paramsStr += `${item[0]}=${item[1]}&`
    })
  } else if (isObject(list)) {
    forEach(entries(list), (item) => {
      paramsStr += `${item[0]}=${item[1]}&`
    })
  }
  return paramsStr.slice(0, -1)
}

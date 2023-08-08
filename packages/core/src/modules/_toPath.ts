import { isArray } from './isArray'
import { isString } from './isString'

/**
 * 用于`toPath`的内部实现。
 *
 * @example
 * _toPath([])
 * => []
 *
 * _toPath('a.b')
 * => ['a', 'b']
 *
 * _toPath( ... )
 * => [ ... ]
 *
 * @param path 给定路径值
 */
export function _toPath(path: unknown) {
  if (path == null) {
    return []
  }
  const results = []
  if (isArray(path)) {
    for (let i = 0, { length } = path; i < length; i++) {
      const item = path[i]
      results[i] = isString(item) ? item : `${item}`
    }
    return results
  }
  if (isString(path)) {
    return path.split('.')
  }
  return [`${path}`]
}

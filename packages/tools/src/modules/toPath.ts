import { _toPath } from './_toPath'

/**
 * 返回一个数组，数组由`path`转换后组成。
 *
 * @example
 * toPath([])
 * => []
 *
 * toPath('a.b')
 * => ['a', 'b']
 *
 * toPath( ... )
 * => [ ... ]
 *
 * @param path 给定路径值
 */
export function toPath(path: unknown) {
  return _toPath(path)
}

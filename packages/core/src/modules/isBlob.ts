import { _getTag } from './_getTag'

/**
 * 返回一个布尔值，判断给定值是否为`Blob`对象。
 *
 * @example
 * isBlob(new Blob())
 * => true
 *
 * @param value 给定值
 */
export function isBlob(value: unknown): value is Blob {
  return _getTag(value) === '[object Blob]'
}

import { _getTag } from './_getTag'

/**
 * 返回一个布尔值，判断给定值是否为`DataView`对象。
 *
 * @example
 * isDataView(new DataView(new ArrayBuffer(4)))
 * => true
 *
 * @param value 给定值
 */
export function isDataView(value: unknown): value is DataView {
  return _getTag(value) === '[object DataView]'
}

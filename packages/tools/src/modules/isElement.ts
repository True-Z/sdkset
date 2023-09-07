import { isObject } from './isObject'

/**
 * 返回一个布尔值，判断给定值是否为`DOM`对象。
 *
 * @example
 * isElement(document.querySelector('div'))
 * => true
 *
 * @param value 给定值
 */
export function isElement(value: unknown): value is HTMLElement {
  return isObject(value) && value.nodeType === 1
}

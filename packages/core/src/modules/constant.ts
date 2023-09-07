/**
 * 返回一个函数，函数返回给定值自身。
 *
 * @example
 * let stooge = { name: 'moe' }
 * stooge === constant(stooge)()
 * => true
 *
 * @param value 给定值
 */
export function constant<V>(value: V) {
  return function fn() {
    return value
  }
}

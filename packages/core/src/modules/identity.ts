/**
 * 返回给定值，相当于数学里的：`f(x) = x`。可以作为默认的迭代器`iterator`。
 *
 * @example
 * let stooge = { name: 'moe' }
 * stooge === identity(stooge)
 * => true
 *
 * @param value 给定值
 */
export function identity<V>(value: V) {
  return value
}

import { _baseIteratee } from './_baseIteratee'

/**
 * 返回给定值通过`_baseIteratee`转换后的迭代器，支持许多常见回调用例的简写语法。根据值的类型，`Iteratee`将返回：
 *
 * @example
 * // No value
 * Iteratee()
 * => identity()
 *
 * // Function
 * Iteratee(function(n) { return n * 2 })
 * => function(n) { return n * 2 }
 *
 * // Object
 * Iteratee({ firstName: 'Chelsea' })
 * => matcher({ firstName: 'Chelsea' })
 *
 * // other
 * Iteratee('firstName')
 * => property('firstName')
 *
 * @param value 给定值
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export function iteratee<V, C>(value: V, context?: C) {
  return _baseIteratee(value, context, Infinity)
}

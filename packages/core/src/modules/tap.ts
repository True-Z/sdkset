import type { Func } from '@sdkset/types'

/**
 * 使用给定对象作为参数调用给定函数后返回给定对象。
 * 这种方法的主要意图是作为函数链式调用的一环, 为了对此对象执行操作并返回对象本身。
 *
 * @example
 * chain([1,2,3,200])
 *   .filter(function(num) { return num % 2 == 0 })
 *   .tap(alert)
 *   .map(function(num) { return num * num })
 *   .value()
 * => // [2, 200] (alerted)
 * => [4, 40000]
 *
 * @param object 给定对象
 * @param interceptor 给定函数
 */
export function tap<V>(object: V, interceptor: Func) {
  interceptor(object)
  return object
}

import { _optimizeCb } from './_optimizeCb'

/**
 * 返回一个数组，数组由给定函数调用`n`次的返回值组成，每一次调用给定函数时传递`index`参数。
 *
 * @example
 * times(3, function(n){ return n })
 * => [0, 1, 2]
 *
 * @param n 迭代次数
 * @param iteratee 迭代器函数：(index) => unknown
 * @param context 上下文对象
 */
export function times<TResult>(n: number, iteratee?: (n: number) => TResult, context?: unknown) {
  const cb = _optimizeCb(iteratee, context, 1)
  n = Math.max(0, n)
  const results = []
  for (let i = 0; i < n; i++) {
    results[i] = cb(i)
  }
  return results as TResult[]
}

/**
 * 返回一个数组，数组由`start`到`stop`之间的整数组成，如果没有传递`stop`，则`start`作为结束值，`0`为起始。
 * 用`step`来增加（或减少）步长，便于`forEach`和`map`循环。
 * 如果需要一个负数的值域 ，请使用负数`step`。
 *
 * @example
 * range(10)
 * => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * range(1, 11)
 * => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *
 * range(0, 30, 5)
 * => [0, 5, 10, 15, 20, 25]
 *
 * range(0, -10, -1)
 * => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
 *
 * range(0)
 * => []
 *
 * @param start 起始值
 * @param stop 结束值
 * @param step 步长
 */
export function range(start: number, stop?: number, step?: number) {
  if (stop == null) {
    stop = start || 0
    start = 0
  }
  if (step == null) {
    step = start > stop ? -1 : 1
  }
  const length = Math.max(Math.ceil((stop - start) / step), 0)
  const results: number[] = []
  for (let i = 0; i < length; i++, start += step) {
    results[i] = start
  }
  return results
}

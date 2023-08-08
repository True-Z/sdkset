import type { Func } from '@sdkset/types'

/**
 * 返回一个`promise`对象，类似`setTimeout`，等待`wait`毫秒后调用给定函数。如果传递可选的参数`args`，当给定函数执行时，`args`以数组的形式作为参数传入，可附加`await`暂停函数等待执行。
 *
 * @example
 * await delay(console.log, 1000, 'logged later')
 * => 'logged later' // 一秒钟后执行
 *
 * @param func 给定函数
 * @param wait 等待毫秒数
 * @param args 附加参数
 */
export async function delay(func: Func, wait: number, ...args: unknown[]) {
  args = args.flat()
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(func(args))
    }, wait)
  })
}

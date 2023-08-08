/**
 * 返回一个`promise`对象，类似`setTimeout`，等待`wait`毫秒，可附加`await`暂停函数执行等待。
 *
 * @example
 * await _.wait(1000)
 * => // 一秒钟后执行
 *
 * @param wait 等待毫秒数
 */
export async function wait(wait: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, wait)
  })
}

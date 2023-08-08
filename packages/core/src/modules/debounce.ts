import { root } from './_setup'
import { isObject } from './isObject'
import { now } from './now'

import type { DebounceOption } from '../types'
import type { Func } from '@sdkset/types'

/**
 * 返回一个防抖函数，该函数会从上一次被调用后，延迟`wait`毫秒后调用给定函数。
 * 给定函数调用时会传入最后一次提供给`debounced`函数的参数。 后续调用的`debounced`函数返回是最后一次给定函数调用的结果。
 * 如果`wait`为`0`并且`leading`为`false`,给定函数调用将被推迟到下一个点，类似`setTimeout`为`0`的超时。
 *
 * @method
 * `debounce.cancel()`
 *
 * 取消防抖函数
 *
 * `debounce.flush()`
 *
 * 立即调用防抖函数
 *
 * `debounce.pending()`
 *
 * 判断是否有正在执行的防抖函数
 *
 * @example
 * // 避免窗口在变动时出现昂贵的计算开销
 * jQuery(window).on('resize', debounce(calculateLayout, 150))
 *
 * // 当点击时 `sendMail` 随后就被调用
 * jQuery(element).on('click', debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }))
 *
 * // 确保 `batchLog` 调用1次之后，1秒内会被触发
 * const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
 * const source = new EventSource('/stream')
 * jQuery(source).on('message', debounced)
 *
 * // 取消一个 trailing 的防抖动调用
 * jQuery(window).on('popstate', debounced.cancel)
 *
 * @param func 需防抖动的函数
 * @param wait 需要延迟的毫秒数
 * @param options 给定选项对象
 * @param options.leading 指定在延迟开始前调用
 * @param options.trailing 指定在延迟结束后调用
 * @param options.maxWait 设置 func 允许被延迟的最大值
 */

export function debounce(func: Func, wait: number, options?: DebounceOption) {
  let lastArgs: unknown[] | undefined
  let lastThis: unknown | undefined
  let maxWait: number | undefined
  let result: unknown | undefined
  let timerId: number | undefined
  let lastCallTime: number | undefined

  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  // 通过显式设置`wait=0`来使用`requestAnimationFrame`
  const useRAF = !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function'

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(+(<number>options.maxWait) || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  /**
   * 执行函数
   */
  function invokeFunc(time: number) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, <unknown[]>args)
    return result
  }

  /**
   * 开启定时器执行函数
   */
  function startTimer(pendingFunc: Func, startWait: number) {
    if (useRAF) {
      root.cancelAnimationFrame(<number>timerId)
      return root.requestAnimationFrame(pendingFunc)
    }
    return setTimeout(pendingFunc, startWait)
  }

  /**
   * 关闭定时器执行函数
   */
  function cancelTimer(id: number) {
    if (useRAF) {
      return root.cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }

  /**
   * wait 时间之前执行逻辑
   */
  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, <number>wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  /**
   * wait 计算剩余等待时间
   */
  function remainingWait(time: number) {
    const timeSinceLastCall = time - <number>lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = <number>wait - timeSinceLastCall

    return maxing ? Math.min(timeWaiting, <number>maxWait - timeSinceLastInvoke) : timeWaiting
  }

  /**
   * 判断 wait 是否达到执行标准
   */
  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - <number>lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // 边界情况判断
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= <number>wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= <number>maxWait)
    )
  }

  /**
   * 重复执行时执行逻辑
   */
  function timerExpired() {
    const time = now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  /**
   * wait 时间之后执行逻辑
   */
  function trailingEdge(time: number) {
    timerId = undefined
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  /**
   * 取消防抖函数
   */
  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  /**
   * 立即调用防抖函数
   */
  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  /**
   * 判断是否有正在执行的防抖函数
   */
  function pending() {
    return timerId !== undefined
  }

  /**
   * 防抖函数
   */
  function debounced(this: unknown, ...args: unknown[]) {
    const time = now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      // 达到要求但是执行一次后 timerID 为 undefined 时启动
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      // 达到要求且存在 maxWait 时
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, <number>wait)
        return invokeFunc(lastCallTime)
      }
    }
    // 未达成执行要求但可以执行时默认启动
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, <number>wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending

  return debounced
}

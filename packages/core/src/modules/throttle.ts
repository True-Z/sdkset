import { debounce } from './debounce'
import { isObject } from './isObject'

import type { DebounceOption } from '../types'
import type { Func } from '@sdkset/types'

/**
 * 创建一个节流函数，在给定毫秒值内最多执行给定函数一次。
 * 给定函数调用时会传入最后一次提供给`throttle`函数的参数。 后续调用的`throttle`函数返回的是最后一次给定函数调用的结果。
 * 如果给定毫秒值为`0`并且`leading`为`false`，给定函数调用将被推迟到下一个点，类似`setTimeout`为`0`的超时。
 *
 * @method
 * `cancel()`
 *
 * 取消节流函数
 *
 * `flush()`
 *
 * 立即调用节流函数
 *
 * `pending()`
 *
 * 判断是否有正在执行的节流函数
 *
 * @example
 * // 避免在滚动时过分的更新定位
 * jQuery(window).on('scroll', throttle(updatePosition, 100));
 *
 * // 点击后就调用 `renewToken`，但5分钟内超过1次。
 * var throttled = throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // 取消一个 trailing 的节流调用。
 * jQuery(window).on('popstate', throttled.cancel);
 *
 * @param func 给定函数
 * @param wait 给定毫秒值
 * @param options 给定选项对象
 * @param options.leading 是否在节流开始前调用
 * @param options.trailing 是否在节流结束后调用
 */
export function throttle(func: Func, wait: number, options?: Omit<DebounceOption, 'maxWait'>) {
  let leading = true
  let trailing = true
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    maxWait: wait,
    leading,
    trailing
  })
}

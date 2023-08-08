/**
 * 返回当前时间的时间戳。
 *
 * @example
 * now()
 * => 1392066795351
 */
export const now =
  Date.now ||
  function fn() {
    return new Date().getTime()
  }

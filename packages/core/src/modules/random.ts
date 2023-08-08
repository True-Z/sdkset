/**
 * 返回一个`min`和`max`之间的随机整数。如果只传递一个参数，那么将返回`0`和这个参数之间的整数。
 *
 * @example
 * random(0, 100);
 * => 4
 *
 * @param min 最小值
 * @param max 最大值
 */
export function random(min: number, max?: number) {
  if (max == null) {
    max = min
    min = 0
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

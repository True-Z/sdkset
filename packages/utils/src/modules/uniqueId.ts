let idCounter = 0

/**
 * 返回一个字符串，字符串由`prefix`加上全局唯一的`id`组成，主要用在需要为客户端模型或`DOM`元素生成一个全局唯一的`id`时。
 *
 * @example
 * uniqueId('contact_')
 * => 'contact_104
 *
 * @param prefix id 前缀
 */
export function uniqueId(prefix?: string) {
  const id = `${++idCounter}`
  return prefix ? prefix + id : id
}

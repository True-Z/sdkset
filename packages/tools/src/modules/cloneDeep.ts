import { _createClone } from './_createClone'

/**
 * 推荐原生：[structuredClone](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone)。
 * 返回给定值的深拷贝。任何嵌套的对象或数组都通过值拷贝，对于不可拷贝的对象，例如`function`则返回`{}`。
 *
 * @example
 * const storage = { name: { deep: { ... } } }
 *
 * storage.deep === cloneDeep(storage).deep
 * => false
 *
 * @param value 给定值
 */
export function cloneDeep<V>(value: V): V {
  return _createClone(value, true)
}

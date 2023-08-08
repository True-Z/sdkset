import { _createClone } from './_createClone'

/**
 * 返回给定值的浅拷贝。任何嵌套的对象或数组都通过引用拷贝。
 *
 * @example
 * const storage = { name: { deep: { ... } } }
 * storage.deep === cloneDeep(storage).deep
 * => true
 *
 * @param value 给定值
 */
export function clone<V>(value: V): V {
  return _createClone(value, false)
}

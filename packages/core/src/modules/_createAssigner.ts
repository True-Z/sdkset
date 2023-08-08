import type { Dictionary, Func } from '@sdkset/types'

/**
 * 用于创建`extendOwn`、`extend`、`defaults`的内部函数。
 *
 * @example
 * _createAssigner(keys, false)
 * => extendOwn
 *
 * _createAssigner(allKeys, false)
 * => extend
 *
 * _createAssigner(allKeys, true)
 * => defaults
 *
 * @param keysFunc 给定获取键函数
 * @param defaults defaults 创建标识
 */
export function _createAssigner(keysFunc: Func<string[]>, defaults?: unknown) {
  return function fn(object: Dictionary, ...handles: Dictionary[]) {
    if (defaults) {
      object = Object(object)
    }
    const { length } = handles
    if (!length || object == null) {
      return object
    }
    for (let index = 0; index < length; index++) {
      const source = handles[index]
      const keys = keysFunc(source)
      const { length: len } = keys
      for (let i = 0; i < len; i++) {
        const key = keys[i]
        if (!defaults || object[key] === undefined) {
          object[key] = source[key]
        }
      }
    }
    return object
  }
}

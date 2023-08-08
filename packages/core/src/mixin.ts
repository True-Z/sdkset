import { core } from './core'
import { forEach, functions } from './modules/__index'
import { ArrayProto, push } from './modules/_setup'

import type { Dictionary, Func } from '@sdkset/types'

/**
 * 允许使用自定义函数扩展`core`对象，传递一个`{name: function}`定义的函数集对象添加到`core`对象，后续即可使用`core`链式调用自定义函数。
 *
 * @example
 * mixin({
 *   capitalize: function(string) {
 *     return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
 *   }
 * })
 * core("fabio").capitalize()
 * => 'Fabio'
 *
 * @param object 给定函数对象
 */
export function mixin(object: Dictionary<Func>) {
  forEach(functions(object), (name) => {
    const func = object[name]
    core.prototype[name] = function fn(...rest: unknown[]) {
      const args = [this._wrapped]
      push.apply(args, rest)
      return chainResult(this, func.apply(core, args))
    }
  })
  return core
}

// 添加原生`Array`函数到`Core`中
forEach(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], (name) => {
  const method = ArrayProto[name as unknown as number]
  core.prototype[name] = function fn(...args: unknown[]) {
    const obj = this._wrapped
    if (obj !== null) {
      method.apply(obj, args)
      if (name === 'shift' || (name === 'splice' && obj.length === 0)) {
        delete obj[0]
      }
    }
    return chainResult(this, obj)
  }
})
forEach(['concat', 'join', 'slice'], (name) => {
  const method = ArrayProto[name as unknown as number]
  core.prototype[name] = function fn(...args: unknown[]) {
    let obj = this._wrapped
    if (obj !== null) {
      obj = method.apply(obj, args)
    }
    return chainResult(this, obj)
  }
})

/**
 * 用于继续链接中间结果的`Helper`函数。
 *
 * @example
 * chainResult({ _chain: true }, { ... })
 * => _(obj).chain()
 *
 * chainResult({ _chain: false }, { ... })
 * => obj
 *
 * @param instance 当前实例
 * @param obj 给定参数对象
 */
function chainResult(instance: Dictionary, obj: unknown) {
  return instance._chain ? core(obj).chain() : obj
}

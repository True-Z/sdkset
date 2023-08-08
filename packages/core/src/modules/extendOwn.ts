import { _createAssigner } from './_createAssigner'
import { nativeAssign } from './_setup'
import { ifNil } from './ifNil'
import { keys } from './keys'

/**
 * 推荐原生：[Object.assign](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)。
 * 返回给定对象，使用`handles`对象中所有可枚举的自有属性覆盖到给定对象上。
 *
 * @example
 * extendOwn({}, { a: 1 })
 * => { a: 1 }
 *
 * @param object 给定对象
 * @param handles 覆盖对象
 */
export const extendOwn = ifNil(nativeAssign, _createAssigner(keys))

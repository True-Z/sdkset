import { _createAssigner } from './_createAssigner'
import { allKeys } from './allKeys'

/**
 * 返回给定对象，使用`handles`对象中的所有可枚举的、可继承的属性覆盖到给定对象上。复制是按顺序的，所以后面的对象属性会把前面的对象属性覆盖掉（如果有重复）。
 *
 * @example
 * extend({ name: 'moe' }, { age: 50 })
 * => { name: 'moe', age: 50 }
 *
 * @param object 给定对象
 * @param handles 覆盖对象
 */
export const extend = _createAssigner(allKeys)

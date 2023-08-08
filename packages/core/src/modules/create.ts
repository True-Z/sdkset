import { _baseCreate } from './_baseCreate'
import { extendOwn } from './extendOwn'

/**
 * 推荐原生：[Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)。
 * 返回一个对象，对象以给定对象作为原型，可附加`props`作为对象的属性。基本上，和`Object.create`一样，但是没有所有的属性描述符。
 *
 * @example
 * create(Stooge.prototype, { name: 'Moe' })
 * => { name: 'Moe', __proto__: Stooge.protoType }
 *
 * @param prototype 给定对象
 * @param props 附加属性对象
 */
export function create(prototype: unknown, props?: object) {
  const result = _baseCreate(prototype)
  if (props) {
    extendOwn(result, props)
  }
  return result
}

import { _createAssigner } from './_createAssigner'
import { allKeys } from './allKeys'

/**
 * 返回给定对象，使用`handles`对象填充给定对象中相应键值为`undefined`的属性。一旦`undefined`属性被填充，再使用`defaults`方法将不会有任何效果。
 *
 * @example
 * const iceCream = { flavor: 'chocolate' }
 * defaults(iceCream, { flavor: 'vanilla', sprinkles: 'lots' })
 * => { flavor: 'chocolate', sprinkles: 'lots' }
 *
 * @param object 给定对象
 * @param handles 填充对象
 */
export const defaults = _createAssigner(allKeys, true)

import { find } from './find'
import { matcher } from './matcher'

import type { TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 返回给定集合通过`matches(properties)`真值检测（键-值对匹配）的第一个元素。
 * 如果没有找到匹配的属性，或者`list`为空，返回`undefined`。
 *
 * @example
 * findWhere([{ id: 1 }, { id: 2, data: 'data' }, { id: 3 }], { id: 2 })
 * => { id: 2, data: 'data' }
 *
 * @param list 给定集合
 * @param properties 谓语对象
 */
export function findWhere<V extends Collection>(list: V, properties: Partial<TypeOfCollection<V>>) {
  return find(list, matcher(properties))
}

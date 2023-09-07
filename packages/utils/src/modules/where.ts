import { filter } from './filter'
import { matcher } from './matcher'

import type { TypeOfCollection } from '../types'
import type { Collection } from '@sdkset/types'

/**
 * 返回一个数组，数组由给定集合中通过`matcher(attrs)`真值测试（键-值对匹配）的元素组成。
 *
 * @example
 * where([{id: 1, sex: 2}], {id: 1})
 * => [{id: 1}]
 *
 * @param list 给定集合
 * @param properties 谓语对象
 */
export function where<V extends Collection>(list: V, properties: Partial<TypeOfCollection<V>>) {
  return filter(list, matcher(properties))
}

import { observer } from './observer'
import { utils } from './utils'

import type { ChainCore } from './types'

/**
 * 返回一个以给定值封装的`core`对象，在封装的对象上调用方法会返回`core`对象包装器, 直到`value`方法被调用为止。
 *
 * @example
 * const stooges = [{ name: 'curly', age: 25 }, { name: 'moe', age: 21 }, { name: 'larry', age: 23 }]
 * const youngest = chain(stooges)
 *   .sortBy(function(stooge){ return stooge.age; })
 *   .map(function(stooge){ return stooge.name + ' is ' + stooge.age })
 *   .first()
 *   .value()
 * => 'moe is 21'
 *
 * @param value 给定值
 */
export function chain<V>(value?: V) {
  observer.emit('mountDefaultFunction')

  const instance = utils(value)
  instance._chain = true
  return instance as unknown as ChainCore<V>
}

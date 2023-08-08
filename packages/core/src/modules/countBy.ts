import { _group } from './_group'
import { _has } from './_has'

/**
 * 返回一个对象，对象由给定集合通过`iterator`处理分组为多个集合后组成，类似`groupBy`，但是不是返回列表的值，而是返回在该组中值的计数。
 *
 * @example
 * countBy([1, 2, 3, 4, 5], function(num) {
 *   return num % 2 == 0 ? 'even': 'odd'
 * })
 * => { odd: 3, even: 2 }
 *
 * @param list 给定集合
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export const countBy = _group((result, value, key) => {
  if (_has(result, key)) {
    result[key]++
  } else {
    result[key] = 1
  }
})

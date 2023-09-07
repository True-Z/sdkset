import { _group } from './_group'
import { _has } from './_has'

/**
 * 返回一个对象，对象由给定集合通过`iterator`处理分组为多个集合后组成，如果`iterator`是一个字符串而不是函数, 那么将使用`iterator`作为各元素的属性名来进行对比分组。
 *
 * @example
 * groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num) })
 * => {1: [1.3], 2: [2.1, 2.4]}
 *
 * groupBy(['one', 'two', 'three'], 'length')
 * => { 3: ['one', 'two'], 5: ['three'] }
 *
 * @param list 给定集合
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export const groupBy = _group((result, value, key) => {
  if (_has(result, key)) {
    return result[key].push(value)
  }
  result[key] = [value]
})

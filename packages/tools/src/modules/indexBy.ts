import { _group } from './_group'

/**
 * 返回一个对象，对象由给定集合通过`iterator`处理分组为多个集合后组成，如果`iterator`是一个字符串而不是函数, 那么将使用`iterator`作为各元素的属性名来对比进行分组。和`groupBy`非常像，但是当你知道你的键是唯一的时候可以使用`indexBy`。
 *
 * @example
 * const stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }]
 * indexBy(stooges, 'age')
 * => {
 *   "40": { name: 'moe', age: 40 },
 *   "50": { name: 'larry', age: 50 },
 *   "60": { name: 'curly', age: 60 }
 * }
 *
 * @param list 给定集合
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export const indexBy = _group((result, value, key) => {
  result[key] = value
})

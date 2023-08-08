import { _group } from './_group'

/**
 * 返回一个数组，数组由给定集合通过`iteratee`处理分组为两个数组后组成，满足`iteratee`的元素放入第一个数组，不满足放入第二个数组。
 *
 * @example
 * partition([0, 1, 2, 3, 4, 5], isOdd)
 * => [[1, 3, 5], [0, 2, 4]]
 *
 * @param list 给定集合
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为迭代器函数的执行上下文 this
 */
export const partition = _group((result, value, pass) => {
  result[pass ? 0 : 1].push(value)
}, true)

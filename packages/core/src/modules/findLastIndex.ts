import { _createPredicateIndexFinder } from './_createPredicateIndexFinder'

/**
 * 反向迭代数组，返回给定数组中第一个通过`predicate`真值检测的索引，如果没有元素通过检测则返回`-1`
 * @example
 * findLastIndex([4, 6, 7, 12], (item) => item === 7)
 * => 2
 *
 * findLastIndex([4, 6, 8, 12], (item) => item === 1)
 * => -1
 *
 * @param array 需操作数组
 * @param predicate 谓语迭代器函数，通过 iteratee 进行转换，以简化速记语法
 * @param context 上下文对象，若传递，则作为谓语迭代器函数的执行上下文 this
 */
export const findLastIndex = _createPredicateIndexFinder(-1)

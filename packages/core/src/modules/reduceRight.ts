import { _createReduce } from './_createReduce'

/**
 * 反向迭代集合，返回将给定集合中元素值归结的数值。`memo`是`reduce`函数的初始值，会被每一次成功调用`iteratee`函数的返回值所取代。
 * 如果没有传递`memo`给`reduce`函数，`iteratee`不会被列表中的第一个元素调用。第一个元素将取代`memo`参数传递给列表中下一个元素调用的`iteratee`函数。
 *
 * @example
 * const list = [[0, 1], [2, 3], [4, 5]]
 * reduceRight(list, function(a, b) { return a.concat(b) }, [])
 * => [4, 5, 2, 3, 0, 1]
 *
 * @param list 给定集合
 * @param iteratee 迭代器函数，通过 iteratee 进行转换，(memo, value, index or key, list)
 * @param memo 初始值
 */
export const reduceRight = _createReduce(-1)

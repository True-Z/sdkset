import { _createIndexFinder } from './_createIndexFinder'
import { findIndex } from './findIndex'
import { sortedIndex } from './sortedIndex'

/**
 * 推荐原生：[Array.prototype.indexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)。
 * 返回`value`在给定数组中的索引，如果`value`不存在则返回`-1`，若数组已升序则推荐`isSortedOrFromIndex`参数传递`true`使用二分查找。
 *
 * @example
 * indexOf([1, 2, 3], 2)
 * => 1
 *
 * indexOf([1, 2, 3], 4)
 * => -1
 *
 *
 * @param array 给定数组
 * @param value 需检索值
 * @param isSortedOrFromIndex 起始索引，或传递 true 进行二分查找（数组已升序）
 */
export const indexOf = _createIndexFinder(1, findIndex, sortedIndex)

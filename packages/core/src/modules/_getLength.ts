import { _shallowProperty } from './_shallowProperty'

/**
 * 用于`length`的内部实现。
 *
 * @example
 * _getLength([1, 2, 3])
 * => 3
 *
 * @param key 给定键
 */
export const _getLength = _shallowProperty('length') as (key: unknown) => number

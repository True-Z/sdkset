import { _shallowProperty } from './_shallowProperty'

/**
 * 用于`byteLength`的内部实现。
 *
 * @example
 * _getByteLength({byteLength: 1})
 * => 1
 *
 * @param key 给定键
 */
export const _getByteLength = _shallowProperty('byteLength') as (key: unknown) => number

import { describe, expect, test } from 'vitest'
import * as sdk from '../src'
import { ifNil } from '../src'

describe('language', () => {
  test('ifNil', () => {
    expect(sdk.ifNil('', 'def')).toStrictEqual('')
    expect(sdk.ifNil(null, 'def')).toStrictEqual('def')
    expect(sdk.ifNil(undefined, 'def')).toStrictEqual('def')
    expect(sdk.ifNil('', 'def', (value) => value + 1)).toStrictEqual('1')
  })

  test('ifNilorBlank', () => {
    expect(sdk.ifNilorBlank('', 'def')).toStrictEqual('def')
    expect(sdk.ifNilorBlank(null, 'def')).toStrictEqual('def')
    expect(sdk.ifNilorBlank(undefined, 'def')).toStrictEqual('def')
    expect(sdk.ifNilorBlank('test', 'def', (value) => value + 1)).toStrictEqual('test1')
  })

  test('toArray', () => {
    expect(
      (function (...args: unknown[]) {
        return sdk.toArray(arguments).slice(1)
      })(1, 2, 3, 4)
    ).toStrictEqual([2, 3, 4])
    expect(sdk.toArray({})).toStrictEqual([])
    expect(sdk.toArray(null)).toStrictEqual([])
  })

  test('toParams', () => {
    expect(sdk.toParams({ id: 1, sex: 1 })).toStrictEqual('id=1&sex=1')
    expect(
      sdk.toParams([
        ['id', 1],
        ['sex', 1]
      ])
    ).toStrictEqual('id=1&sex=1')
    expect(sdk.toParams({})).toStrictEqual('')
    expect(sdk.toParams([])).toStrictEqual('')
    expect(sdk.toParams(null)).toStrictEqual('')
  })

  test('toPath', () => {
    expect(sdk.toPath([1, 2])).toStrictEqual(['1', '2'])
    expect(sdk.toPath('a.b')).toStrictEqual(['a', 'b'])
    expect(sdk.toPath([])).toStrictEqual([])
    expect(sdk.toPath(null)).toStrictEqual([])
  })

  test('isNumber', () => {
    expect(sdk.isNumber(1)).toStrictEqual(true)
    expect(sdk.isNumber(0.2)).toStrictEqual(true)
    expect(sdk.isNumber(-1)).toStrictEqual(true)
    expect(sdk.isNumber(null)).toStrictEqual(false)
    expect(sdk.isNumber(undefined)).toStrictEqual(false)
    expect(sdk.isNumber('')).toStrictEqual(false)
  })
  test('isFinite', () => {
    expect(sdk.isFinite(0)).toStrictEqual(true)
    expect(sdk.isFinite(9007199254740991)).toStrictEqual(true)
    expect(sdk.isFinite(0.1)).toStrictEqual(true)
    expect(sdk.isFinite(-0.1)).toStrictEqual(true)
    expect(sdk.isFinite(null)).toStrictEqual(false)
    expect(sdk.isFinite(undefined)).toStrictEqual(false)
    expect(sdk.isFinite(Infinity)).toStrictEqual(false)
    expect(sdk.isFinite(-Infinity)).toStrictEqual(false)
  })

  test('isNaN', () => {
    expect(sdk.isNaN(NaN)).toStrictEqual(true)
    expect(sdk.isNaN(undefined)).toStrictEqual(false)
    expect(sdk.isNaN('')).toStrictEqual(false)
  })

  test('isString', () => {
    expect(sdk.isString('')).toStrictEqual(true)
    expect(sdk.isString(String(''))).toStrictEqual(true)
    expect(sdk.isString(null)).toStrictEqual(false)
    expect(sdk.isString(undefined)).toStrictEqual(false)
  })

  test('isBoolean', () => {
    expect(sdk.isBoolean(true)).toStrictEqual(true)
    expect(sdk.isBoolean(Boolean())).toStrictEqual(true)
    expect(sdk.isBoolean(null)).toStrictEqual(false)
    expect(sdk.isBoolean('')).toStrictEqual(false)
  })

  test('isUndefined', () => {
    expect(sdk.isUndefined(undefined)).toStrictEqual(true)
    expect(sdk.isUndefined(null)).toStrictEqual(false)
    expect(sdk.isUndefined('')).toStrictEqual(false)
  })

  test('isNull', () => {
    expect(sdk.isNull(null)).toStrictEqual(true)
    expect(sdk.isNull(undefined)).toStrictEqual(false)
    expect(sdk.isNull('')).toStrictEqual(false)
  })

  test('isNil', () => {
    expect(sdk.isNil(null)).toStrictEqual(true)
    expect(sdk.isNil(undefined)).toStrictEqual(true)
    expect(sdk.isNil('')).toStrictEqual(false)
  })

  test('isBlank', () => {
    expect(sdk.isBlank('')).toStrictEqual(true)
    expect(sdk.isBlank(`${''}`)).toStrictEqual(true)
    expect(sdk.isBlank('auto')).toStrictEqual(false)
  })

  test('isNilorBlank', () => {
    expect(sdk.isNilorBlank(null)).toStrictEqual(true)
    expect(sdk.isNilorBlank(undefined)).toStrictEqual(true)
    expect(sdk.isNilorBlank('')).toStrictEqual(true)
    expect(sdk.isNilorBlank(1)).toStrictEqual(false)
    expect(sdk.isNilorBlank({})).toStrictEqual(false)
  })

  test('isEmpty', () => {
    expect(sdk.isEmpty([])).toStrictEqual(true)
    expect(sdk.isEmpty(new Set())).toStrictEqual(true)
    expect(sdk.isEmpty(new Map())).toStrictEqual(true)
    expect(sdk.isEmpty({})).toStrictEqual(true)
    expect(sdk.isEmpty('')).toStrictEqual(true)
    expect(sdk.isEmpty(null)).toStrictEqual(true)
    expect(sdk.isEmpty(undefined)).toStrictEqual(true)
    expect(sdk.isEmpty('test')).toStrictEqual(false)
    expect(sdk.isEmpty([1])).toStrictEqual(false)
    expect(sdk.isEmpty({ id: 1 })).toStrictEqual(false)
  })

  test('isEqual', () => {
    const a = { id: 1, data: {} }
    const b = { id: 1, data: {} }
    a.data = b
    b.data = a
    expect(sdk.isEqual({ id: [1, 2, 3, { id: 2 }] }, { id: [1, 2, 3, { id: 2 }] })).toStrictEqual(true)
    expect(sdk.isEqual(a, b)).toStrictEqual(true)
    expect(sdk.isEqual(NaN, NaN)).toStrictEqual(true)
    expect(sdk.isEqual('', '')).toStrictEqual(true)
    expect(sdk.isEqual(null, null)).toStrictEqual(false)
    expect(sdk.isEqual(null, undefined)).toStrictEqual(false)
    expect(sdk.isEqual(+0, -0)).toStrictEqual(false)
  })

  test('isSymbol', () => {
    expect(sdk.isSymbol(Symbol('key'))).toStrictEqual(true)
    expect(sdk.isSymbol('')).toStrictEqual(false)
  })

  test('isFunction', () => {
    expect(sdk.isFunction(() => {})).toStrictEqual(true)
    expect(sdk.isFunction('')).toStrictEqual(false)
  })

  test('isObject', () => {
    expect(sdk.isObject({})).toStrictEqual(true)
    expect(sdk.isObject(new Map())).toStrictEqual(true)
    expect(sdk.isObject([])).toStrictEqual(true)
    expect(sdk.isObject(null)).toStrictEqual(false)
    expect(sdk.isObject('')).toStrictEqual(false)
  })

  test('isPrototype', () => {
    expect(sdk.isPrototype(Object.prototype)).toStrictEqual(true)
    expect(sdk.isPrototype({})).toStrictEqual(false)
    expect(sdk.isPrototype('')).toStrictEqual(false)
  })

  test('isMatch', () => {
    expect(sdk.isMatch({ id: 1, sex: 2 }, { id: 1 })).toStrictEqual(true)
    expect(sdk.isMatch({ id: 1, sex: 2 }, { id: 3 })).toStrictEqual(false)
  })

  test('isArray', () => {
    expect(sdk.isArray([])).toStrictEqual(true)
    expect(
      (function (...args: unknown[]) {
        return sdk.isArray(arguments)
      })(1, 2, 3)
    ).toStrictEqual(false)
    expect(sdk.isArray('')).toStrictEqual(false)
    expect(sdk.isArray({})).toStrictEqual(false)
  })

  test('isLength', () => {
    expect(sdk.isLength(0)).toStrictEqual(true)
    expect(sdk.isLength(9007199254740991)).toStrictEqual(true)
    expect(sdk.isLength(9007199254740992)).toStrictEqual(false)
    expect(sdk.isLength(-1)).toStrictEqual(false)
    expect(sdk.isLength('')).toStrictEqual(false)
  })

  test('isArguments', () => {
    expect(
      (function (...args: unknown[]) {
        return sdk.isArguments(arguments)
      })(1, 2, 3)
    ).toStrictEqual(true)
    expect(sdk.isArguments([1, 2, 3])).toStrictEqual(false)
  })

  test('isArrayBuffer', () => {
    expect(sdk.isArrayBuffer(new ArrayBuffer(4))).toStrictEqual(true)
    expect(sdk.isArrayBuffer('')).toStrictEqual(false)
  })

  test('isArrayLike', () => {
    expect(sdk.isArrayLike([])).toStrictEqual(true)
    expect(
      (function (...args: unknown[]) {
        return sdk.isArrayLike(arguments)
      })(1, 2, 3)
    ).toStrictEqual(true)
    expect(sdk.isArrayLike('')).toStrictEqual(true)
    expect(sdk.isArrayLike({})).toStrictEqual(false)
  })

  test('isBlob', () => {
    expect(sdk.isBlob(new Blob())).toStrictEqual(true)
    expect(sdk.isBlob('')).toStrictEqual(false)
  })

  test('isTypedArray', () => {
    expect(sdk.isTypedArray(new Int8Array())).toStrictEqual(true)
    expect(sdk.isTypedArray('')).toStrictEqual(false)
  })

  test('isDataView', () => {
    expect(sdk.isDataView(new DataView(new ArrayBuffer(4)))).toStrictEqual(true)
    expect(sdk.isDataView('')).toStrictEqual(false)
  })

  test('isDate', () => {
    expect(sdk.isDate(new Date())).toStrictEqual(true)
    expect(sdk.isDate('')).toStrictEqual(false)
  })

  test('isRegExp', () => {
    expect(sdk.isRegExp(new RegExp('test'))).toStrictEqual(true)
    expect(sdk.isRegExp('')).toStrictEqual(false)
  })

  test('isError', () => {
    expect(sdk.isError(new TypeError('type error'))).toStrictEqual(true)
    expect(sdk.isError('')).toStrictEqual(false)
  })

  test('isElement', () => {
    const div = document.createElement('div')
    expect(sdk.isElement(div)).toStrictEqual(true)
    expect(sdk.isElement('')).toStrictEqual(false)
    expect(sdk.isElement({})).toStrictEqual(false)
    expect(sdk.isElement(null)).toStrictEqual(false)
  })

  test('isMap', () => {
    expect(sdk.isMap(new Map())).toStrictEqual(true)
    expect(sdk.isMap('')).toStrictEqual(false)
  })

  test('isWeakMap', () => {
    expect(sdk.isWeakMap(new WeakMap())).toStrictEqual(true)
    expect(sdk.isWeakMap('')).toStrictEqual(false)
  })

  test('isSet', () => {
    expect(sdk.isSet(new Set())).toStrictEqual(true)
    expect(sdk.isSet('')).toStrictEqual(false)
  })

  test('isWeakSet', () => {
    expect(sdk.isWeakSet(new WeakSet())).toStrictEqual(true)
    expect(sdk.isWeakSet('')).toStrictEqual(false)
  })
})

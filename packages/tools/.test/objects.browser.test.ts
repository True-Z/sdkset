import { describe, expect, test } from 'vitest'
import * as sdk from '../src'

describe('object', () => {
  test('create', () => {
    const proto = {}
    let obj = sdk.create(proto)
    expect(Object.getPrototypeOf(obj)).toStrictEqual(proto)
    obj = sdk.create(null)
    expect(Object.getPrototypeOf(obj)).toStrictEqual({})
    expect(obj).toStrictEqual({})
  })

  test('extend', () => {
    const attrs = sdk.create({}, { id: 1 })
    Object.getPrototypeOf(attrs).sex = 2
    const obj = sdk.extend({}, attrs)
    expect(obj.hasOwnProperty('id')).toStrictEqual(true)
    expect(obj.hasOwnProperty('sex')).toStrictEqual(true)
    expect(sdk.extend({}, null)).toStrictEqual({})
  })

  test('extendOwn', () => {
    const attrs = sdk.create({}, { id: 1 })
    Object.getPrototypeOf(attrs).sex = 2
    const obj = sdk.extendOwn({}, attrs)
    expect(obj.hasOwnProperty('id')).toStrictEqual(true)
    expect(obj.hasOwnProperty('sex')).toStrictEqual(false)
    expect(sdk.extendOwn({}, null)).toStrictEqual({})
  })

  test('defaults', () => {
    const attrs = { id: 1 }
    const obj = sdk.defaults({}, attrs)
    expect(obj.id).toStrictEqual(1)
    expect(sdk.defaults(obj, { id: 3 }).id).toStrictEqual(1)
    expect(sdk.defaults(null, null)).toStrictEqual({})
  })

  test('keys', () => {
    const attrs = { id: 1, sex: 2 }
    const obj = Object.create(attrs)
    obj.name = 'tom'
    expect(sdk.keys(obj)).toStrictEqual(['name'])
    expect(sdk.keys(null)).toStrictEqual([])
  })

  test('allKeys', () => {
    const attrs = { id: 1, sex: 2 }
    const obj = Object.create(attrs)
    obj.name = 'tom'
    expect(sdk.allKeys(obj)).toStrictEqual(['name', 'id', 'sex'])
    expect(sdk.allKeys(null)).toStrictEqual([])
  })

  test('values', () => {
    const attrs = { id: 1, sex: 2 }
    const obj = Object.create(attrs)
    obj.name = 'tom'
    expect(sdk.values(obj)).toStrictEqual(['tom'])
    expect(sdk.values(null)).toStrictEqual([])
  })

  test('functions', () => {
    const obj = {
      id: 1,
      fn: () => {},
      test: () => {}
    }
    expect(sdk.functions(obj)).toStrictEqual(['fn', 'test'])
    expect(sdk.functions(null)).toStrictEqual([])
  })

  test('entries', () => {
    const attrs = { id: 1, sex: 2 }
    const obj = Object.create(attrs)
    obj.name = 'tom'
    expect(sdk.entries(obj)).toStrictEqual([['name', 'tom']])
    expect(sdk.entries(null)).toStrictEqual([])
  })

  test('invert', () => {
    expect(sdk.invert({ Moe: 'Moses', Larry: 'Louis', Curly: 'Jerome' })).toStrictEqual({
      Moses: 'Moe',
      Louis: 'Larry',
      Jerome: 'Curly'
    })
    expect(sdk.invert(null)).toStrictEqual({})
  })

  test('clone', () => {
    const obj = {
      id: 1,
      data: { id: 2 }
    }
    expect(sdk.clone(obj).data === obj.data).toStrictEqual(true)
    expect(sdk.clone(null)).toStrictEqual(null)
    expect(sdk.clone(undefined)).toStrictEqual(undefined)
  })

  test('cloneDeep', () => {
    const obj = {
      id: 1,
      data: { id: 2 }
    }
    expect(sdk.cloneDeep(obj).data === obj.data).toStrictEqual(false)
    expect(sdk.cloneDeep(null)).toStrictEqual(null)
    expect(sdk.cloneDeep(undefined)).toStrictEqual(undefined)
  })

  test('get', () => {
    const data = { id: 1, data: 'data' }
    expect(sdk.get(data, 'id', 'def')).toStrictEqual(1)
    expect(sdk.get(data, 'test', 'def')).toStrictEqual('def')
    expect(sdk.get(data, 'test')).toStrictEqual(undefined)
    expect(sdk.get(null, null)).toStrictEqual(undefined)
  })

  test('has', () => {
    const obj = { id: 1, data: 'data' }
    expect(sdk.has(obj, 'id')).toStrictEqual(true)
    expect(sdk.has(obj, 'sex')).toStrictEqual(false)
    expect(sdk.has(obj, null)).toStrictEqual(false)
    expect(sdk.has(null, null)).toStrictEqual(false)
  })

  test('pick', () => {
    const obj = { name: 'moe', age: 50, userid: 'moe1' }
    expect(sdk.pick(obj, 'age')).toStrictEqual({ age: 50 })
    expect(sdk.pick(obj, ['age', 'userid'])).toStrictEqual({ age: 50, userid: 'moe1' })
    expect(sdk.pick(obj, (value) => +value > 10)).toStrictEqual({ age: 50 })
    expect(sdk.pick(obj, 'id')).toStrictEqual({})
    expect(sdk.pick(obj, null)).toStrictEqual({})
    expect(sdk.pick(null, null)).toStrictEqual({})
  })

  test('omit', () => {
    const data = { name: 'moe', age: 50, userid: 'moe1' }
    expect(sdk.omit(data, 'age')).toStrictEqual({ name: 'moe', userid: 'moe1' })
    expect(sdk.omit(data, ['age', 'userid'])).toStrictEqual({ name: 'moe' })
    expect(sdk.omit(data, (value) => +value > 10)).toStrictEqual({ name: 'moe', userid: 'moe1' })
    expect(sdk.omit(data, 'id')).toStrictEqual(data)
    expect(sdk.omit(data, null)).toStrictEqual(data)
    expect(sdk.omit(null, null)).toStrictEqual({})
  })

  test('findKey', () => {
    const obj = { name: 'moe', age: 50, userid: 'moe1' }
    expect(sdk.findKey(obj, (value) => +value > 10)).toStrictEqual('age')
    expect(sdk.findKey(obj, null)).toStrictEqual('name')
    expect(sdk.findKey(obj, 'id')).toBeUndefined()
    expect(sdk.findKey(null, null)).toBeUndefined()
  })

  test('mapObject', () => {
    const obj = { name: 'moe', age: 50, userid: 'moe1' }
    expect(sdk.mapObject(obj, (value) => +value > 10)).toStrictEqual({ name: false, age: true, userid: false })
    expect(sdk.mapObject(obj, (value, key) => `${key}-${value}`)).toStrictEqual({
      name: 'name-moe',
      age: 'age-50',
      userid: 'userid-moe1'
    })
    expect(sdk.mapObject(null, null)).toStrictEqual({})
  })

  test('property', () => {
    const fn = sdk.property('age')
    expect(fn({ age: 50 })).toStrictEqual(50)
    expect(fn({ id: 1 })).toStrictEqual(undefined)
    expect(fn({})).toStrictEqual(undefined)
    expect(fn(null)).toStrictEqual(undefined)
  })

  test('propertyOf', () => {
    const fn = sdk.propertyOf({ id: 1, age: 50, data: { subId: 10 } })
    expect(fn('id')).toStrictEqual(1)
    expect(fn('age')).toStrictEqual(50)
    expect(fn(['data', 'subId'])).toStrictEqual(10)
    expect(fn(null)).toStrictEqual(undefined)
  })

  test('matcher', () => {
    const fn = sdk.matcher({ id: 1 })
    expect(fn({ id: 1, sex: 0 })).toStrictEqual(true)
    expect(fn({ id: 2, sex: 0 })).toStrictEqual(false)
    expect(fn({ sex: 0 })).toStrictEqual(false)
    expect(fn(null)).toStrictEqual(false)
  })

  test('tap', () => {
    const arr = [1, 2, 3]
    const result = sdk.tap(arr, () => {
      arr.push(4)
    })
    expect(arr).toStrictEqual([1, 2, 3, 4])
    expect(result).toStrictEqual(arr)
  })
})

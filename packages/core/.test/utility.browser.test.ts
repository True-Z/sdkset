import { describe, expect, test } from 'vitest'
import * as sdk from '../src'
import { iteratee } from '../src'

describe('utility', () => {
  test('constant', () => {
    const fn = sdk.constant(1)
    expect(fn()).toStrictEqual(1)
  })

  test('identity', () => {
    expect(sdk.identity(1)).toStrictEqual(1)
    expect(sdk.identity(null)).toStrictEqual(null)
    expect(sdk.identity(undefined)).toStrictEqual(undefined)
  })

  test('iteratee', () => {
    const fn1 = sdk.iteratee(null)
    expect(fn1(1)).toStrictEqual(1)
    const fn2 = sdk.iteratee((value) => value + 1)
    expect(fn2(10)).toStrictEqual(11)
    const fn3 = sdk.iteratee({ id: 1 })
    expect(fn3({ id: 1 })).toStrictEqual(true)
    const fn4 = sdk.iteratee(['a', 'b'])
    expect(fn4({ a: { b: 1 } })).toStrictEqual(1)
  })

  test('noop', () => {
    expect(sdk.noop()).toStrictEqual(undefined)
  })

  test('now', () => {
    expect(sdk.now()).toBeTypeOf('number')
  })

  test('random', () => {
    expect(sdk.random(0)).toStrictEqual(0)
    expect(sdk.random(3) <= 3).toStrictEqual(true)
    expect(sdk.random(null)).toStrictEqual(0)
  })

  test('result', () => {
    expect(
      sdk.result(
        {
          id: 1,
          get: function () {
            return this.id
          }
        },
        'get'
      )
    ).toStrictEqual(1)
    expect(sdk.result({ id: 1 }, 'id')).toStrictEqual(1)
    expect(
      sdk.result({ name: 'x', sex: 1 }, 'id', function () {
        return this.sex
      })
    ).toStrictEqual(1)
    expect(sdk.result({ name: 'x' }, 'id', 1)).toStrictEqual(1)
  })

  test('swap', () => {
    const arr = [1, 2]
    sdk.swap(arr, 0, 1)
    expect(arr).toStrictEqual([2, 1])
    const obj = { id: 1, sex: 2 }
    sdk.swap(obj, 'id', 'sex')
    expect(obj).toStrictEqual({ id: 2, sex: 1 })
  })

  test('times', () => {
    expect(sdk.times(3, (i) => i)).toStrictEqual([0, 1, 2])
    expect(sdk.times(0)).toStrictEqual([])
    expect(sdk.times(null)).toStrictEqual([])
  })

  test('wait', async () => {
    let flag = false
    setTimeout(() => {
      flag = true
    }, 1000)
    expect(flag).toStrictEqual(false)
    await sdk.wait(1000)
    expect(flag).toStrictEqual(true)
  })

  test('uniqueId', () => {
    expect(sdk.uniqueId()).toStrictEqual('1')
    expect(sdk.uniqueId('id-')).toStrictEqual('id-2')
    expect(sdk.uniqueId('userid-')).toStrictEqual('userid-3')
    expect(sdk.uniqueId(null)).toStrictEqual('4')
  })
})

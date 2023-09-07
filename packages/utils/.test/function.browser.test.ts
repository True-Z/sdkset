import { describe, expect, test } from 'vitest'
import * as sdk from '../src'

describe('function', () => {
  test('after', () => {
    const fn = sdk.after(2, (num) => num)
    expect(fn()).toBeUndefined()
    expect(fn(2)).toStrictEqual(2)
    expect(fn(3)).toStrictEqual(3)
  })

  test('before', () => {
    const fn = sdk.before(2, (num) => num + 1)
    expect(fn(1)).toStrictEqual(2)
    expect(fn(2)).toStrictEqual(2)
    expect(fn(3)).toStrictEqual(2)
  })

  test('once', () => {
    const fn = sdk.once((num) => num + 1)
    expect(fn(1)).toStrictEqual(2)
    expect(fn(2)).toStrictEqual(2)
    expect(fn(3)).toStrictEqual(2)
  })

  test('delay', async () => {
    let data = 10
    sdk.delay((args) => (data += args[0]), 1000, 10)
    expect(data).toStrictEqual(10)
    await sdk.wait(1000)
    expect(data).toStrictEqual(20)
  })

  test('negate', () => {
    const fn = sdk.negate(sdk.isNumber)
    expect(fn('')).toStrictEqual(true)
    expect(fn(null)).toStrictEqual(true)
    expect(fn(1)).toStrictEqual(false)
    expect(fn(0.1)).toStrictEqual(false)
  })

  test('compose', () => {
    const test1 = (num) => num + 1
    const test2 = (num) => num + 2
    const test3 = (num) => num + 3
    const fn = sdk.compose(test1, test2, test3)
    expect(fn(0)).toStrictEqual(6)
    expect(sdk.compose(null)).toThrowError('Expected a function')
  })

  test('debounce', async () => {
    let data = 0
    const fn = sdk.debounce((num) => (data += num), 200)
    fn(1)
    expect(data).toStrictEqual(0)
    await sdk.wait(100)
    fn(1)
    expect(data).toStrictEqual(0)
    await sdk.wait(200)
    fn(1)
    expect(data).toStrictEqual(1)
  })

  test('throttle', async () => {
    let data = 0
    const fn = sdk.throttle((num) => (data += num), 200)
    fn(2)
    expect(data).toStrictEqual(2)
    fn(2)
    expect(data).toStrictEqual(2)
    await sdk.wait(100)
    fn(2)
    expect(data).toStrictEqual(2)
    await sdk.wait(100)
    fn(2)
    expect(data).toStrictEqual(4)
  })
})

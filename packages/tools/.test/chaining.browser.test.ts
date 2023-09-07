import { describe, expect, test } from 'vitest'
import * as sdk from '../src'

describe('chaining', () => {
  test('core', () => {
    expect(sdk._([1, 2, 3]).head()).toStrictEqual(1)

    let temp = 0
    sdk._([1, 2, 3]).forEach((value) => {
      temp += value
    })
    expect(temp).toStrictEqual(6)

    const fn = sdk._(sdk.isNumber).negate()
    expect(fn(10)).toStrictEqual(false)

    expect(sdk._(10).isNumber()).toStrictEqual(true)

    expect(sdk._({ a: 1 }).get('a')).toStrictEqual(1)

    expect(sdk._(1).constant()()).toStrictEqual(1)
  })

  test('chain', () => {
    expect(sdk.chain([1, 2, 3]).head().value()).toStrictEqual(1)
    sdk.chain(1).isNumber().value()
    let temp = 0
    sdk.chain([1, 2, 3]).forEach((value) => {
      temp += value
    })
    expect(temp).toStrictEqual(6)

    const fn = sdk.chain(sdk.isNumber).negate().value()
    expect(fn(10)).toStrictEqual(false)

    expect(sdk.chain(10).isNumber().value()).toStrictEqual(true)

    expect(sdk.chain({ a: 1 }).get('a').value()).toStrictEqual(1)

    expect(sdk.chain(1).constant().value()()).toStrictEqual(1)
  })

  test('mixin', () => {
    const fn = {
      test: (num: unknown) => num
    }
    sdk.mixin(fn)

    expect(sdk._(1).test()).toStrictEqual(1)
  })
})

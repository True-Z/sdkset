import { describe, expect, test } from 'vitest'

import * as sdk from '../src'

describe('numeral', () => {
  test('useNumeral', () => {
    expect(sdk.useNumeral(974).value()).toBe(974)
    expect(sdk.useNumeral(0.12345).value()).toBe(0.12345)
    expect(sdk.useNumeral('10,000.12').value()).toBe(10000.12)
    expect(sdk.useNumeral('23rd').value()).toBe(23)
    expect(sdk.useNumeral('$10,000.00').value()).toBe(10000)
    expect(sdk.useNumeral('100B').value()).toBe(100)
    expect(sdk.useNumeral('3.467TB').value()).toBe(3467000000000)
    expect(sdk.useNumeral('-76%').value()).toBe(-0.76)
    expect(sdk.useNumeral('1:30:30').value()).toBe(5430)
  })

  test('format', () => {
    expect(sdk.useNumeral(10000).format('0,0.0000')).toBe('10,000.0000')
    expect(sdk.useNumeral(10000.23).format('0,0')).toBe('10,000')
    expect(sdk.useNumeral(1000.234).format('$0,0.00')).toBe('$1,000.23')
    expect(sdk.useNumeral(1000.2).format('0,0[.]00 $')).toBe('1,000.20 $')
    expect(sdk.useNumeral(100).format('0b')).toBe('100B')
    expect(sdk.useNumeral(1024).format('0b')).toBe('1KB')
    expect(sdk.useNumeral(1).format('0%')).toBe('100%')
    expect(sdk.useNumeral(0.974878234).format('0.000%')).toBe('97.488%')
    expect(sdk.useNumeral(25).format('00:00:00')).toBe('0:00:25')
    expect(sdk.useNumeral(238).format('00:00:00')).toBe('0:03:58')
    expect(sdk.useNumeral(1123456789).format('0,0e+0')).toBe((1e9).toExponential())
    expect(sdk.useNumeral(12398734.202).format('0.00e+0')).toBe((1.24e7).toExponential())
    expect(sdk.useNumeral(0.000123987).format('0.00e+0')).toBe((1.24e-4).toExponential())
  })
})

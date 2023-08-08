import { describe, expect, test } from 'vitest'

import * as sdk from '../src'

describe('localStorage', () => {
  test('getSession and setLocal', () => {
    sdk.setLocal('key', 'value')
    expect(sdk.getLocal('key')).toBeDefined()
    expect(sdk.getLocal('any')).toBeUndefined()
  })

  test('removeLocal', () => {
    sdk.setLocal('key', 'value')
    sdk.removeLocal('key')
    expect(sdk.getLocal('key')).toBeUndefined()
  })

  test('clearLocal', () => {
    sdk.setLocal('key', 'value')
    sdk.clearLocal()
    expect(sdk.getLocal('key')).toBeUndefined()
  })

  test('localKeys and localValues and localEntries', () => {
    sdk.setLocal('key1', 'value1')
    sdk.setLocal('key2', 'value2')
    expect(sdk.localKeys()).toStrictEqual(['key1', 'key2'])
    expect(sdk.localValues()).toStrictEqual(['value1', 'value2'])
    expect(sdk.localEntries()).toStrictEqual({ key1: 'value1', key2: 'value2' })
  })
})

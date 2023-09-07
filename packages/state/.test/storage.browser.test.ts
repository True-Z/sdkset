import { describe, expect, test } from 'vitest'

import * as sdk from '../src'

describe('storage', () => {
  test('localStorage', () => {
    const sdkLocalStorage = sdk.useStorage()
    sdkLocalStorage.set('key', 'value')
    expect(sdkLocalStorage.get('key')).toBe('value')
    expect(sdkLocalStorage.get('any')).toBeNull()

    sdkLocalStorage.remove('key')
    expect(sdkLocalStorage.get('key')).toBeNull()

    sdkLocalStorage.set('key', 'value')
    sdkLocalStorage.clear()
    expect(sdkLocalStorage.get('key')).toBeNull()

    sdkLocalStorage.set('key1', 'value1')
    sdkLocalStorage.set('key2', 'value2')
    expect(sdkLocalStorage.keys()).toStrictEqual(['key1', 'key2'])
    expect(sdkLocalStorage.values()).toStrictEqual(['value1', 'value2'])
    expect(sdkLocalStorage.entries()).toStrictEqual({ key1: 'value1', key2: 'value2' })
  })

  test('sessionStorage', () => {
    const sdkSessionStorage = sdk.useStorage({ storageType: 'sessionStorage' })
    sdkSessionStorage.set('key', 'value')
    expect(sdkSessionStorage.get('key')).toBe('value')
    expect(sdkSessionStorage.get('any')).toBeNull()

    sdkSessionStorage.remove('key')
    expect(sdkSessionStorage.get('key')).toBeNull()

    sdkSessionStorage.set('key', 'value')
    sdkSessionStorage.clear()
    expect(sdkSessionStorage.get('key')).toBeNull()

    sdkSessionStorage.set('key1', 'value1')
    sdkSessionStorage.set('key2', 'value2')
    expect(sdkSessionStorage.keys()).toStrictEqual(['key1', 'key2'])
    expect(sdkSessionStorage.values()).toStrictEqual(['value1', 'value2'])
    expect(sdkSessionStorage.entries()).toStrictEqual({ key1: 'value1', key2: 'value2' })
  })
})

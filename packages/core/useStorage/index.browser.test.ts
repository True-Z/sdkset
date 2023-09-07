import { describe, expect, test } from 'vitest'

import * as sdk from './index'

describe('useStorage', () => {
  test('localStorage', () => {
    const storage = sdk.useStorage('localStorage')
    storage.set('key', 'value')
    expect(storage.get('key')).toBe('value')
    expect(storage.get('any')).toBeNull()
    expect(storage.get('any', 'defValue')).toBe('defValue')

    storage.remove('key')
    expect(storage.get('key')).toBeNull()

    storage.set('key', 'value')
    storage.clear()
    expect(storage.get('key')).toBeNull()

    storage.set('key1', 'value1')
    storage.set('key2', 'value2')
  })

  test('sessionStorage', () => {
    const storage = sdk.useStorage('sessionStorage')
    storage.set('key', 'value')
    expect(storage.get('key')).toBe('value')
    expect(storage.get('any')).toBeNull()
    expect(storage.get('any', 'defValue')).toBe('defValue')

    storage.remove('key')
    expect(storage.get('key')).toBeNull()

    storage.set('key', 'value')
    storage.clear()
    expect(storage.get('key')).toBeNull()

    storage.set('key1', 'value1')
    storage.set('key2', 'value2')
  })
})

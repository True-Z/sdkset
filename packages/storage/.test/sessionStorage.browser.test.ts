import { describe, expect, test } from 'vitest'

import * as sdk from '../src'

describe('sessionStorage', () => {
  test('getSession and setSession', () => {
    sdk.setSession('key', 'value')
    expect(sdk.getSession('key')).toBeDefined()
    expect(sdk.getSession('any')).toBeUndefined()
  })

  test('removeSession', () => {
    sdk.setSession('key', 'value')
    sdk.removeSession('key')
    expect(sdk.getSession('key')).toBeUndefined()
  })

  test('clearSession', () => {
    sdk.setSession('key', 'value')
    sdk.clearSession()
    expect(sdk.getSession('key')).toBeUndefined()
  })

  test('sessionKeys and sessionValues and sessionEntries', () => {
    sdk.setSession('key1', 'value1')
    sdk.setSession('key2', 'value2')
    expect(sdk.sessionKeys()).toStrictEqual(['key1', 'key2'])
    expect(sdk.sessionValues()).toStrictEqual(['value1', 'value2'])
    expect(sdk.sessionEntries()).toStrictEqual({ key1: 'value1', key2: 'value2' })
  })
})

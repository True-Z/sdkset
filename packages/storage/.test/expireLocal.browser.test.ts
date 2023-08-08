import { describe, expect, test } from 'vitest'

import * as sdk from '../src'

describe('expireLocal', () => {
  test('getExpireLocal and setExpireLocal', () => {
    sdk.setExpireLocal('key', 'value')
    expect(sdk.getExpireLocal('key')).toBeDefined()
    expect(sdk.getExpireLocal('any')).toBeUndefined()
  })

  test('getLocalExpireTime', () => {
    sdk.setLocal('key', 'value')
    expect(sdk.getLocalExpireTime('key')).toBeUndefined()
    sdk.setExpireLocal('key', 'value')
    expect(sdk.getLocalExpireTime('key')).toBeDefined()
    expect(sdk.getLocalExpireTime('any')).toBeUndefined()
  })
})

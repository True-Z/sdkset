import { describe, expect, test } from 'vitest'

import * as sdk from '../src'

describe('observer', () => {
  test('depend and notify', () => {
    const dep = sdk.useObserver()
    let testData1 = 0
    let testData2 = 0
    dep.depend('test', (e) => (testData1 += e))
    dep.depend('test', (e) => (testData2 += e + 10))
    dep.notify('test', 10)
    dep.notify('test', 10)
    expect(testData1).toBe(20)
    expect(testData2).toBe(40)
  })
})

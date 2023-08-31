import { describe, expect, test } from 'vitest'

import * as sdk from '../src'

describe('observer', () => {
  test('on and emit', () => {
    const observer = sdk.useObserver()
    let testData1 = 0
    let testData2 = 0
    observer.on('test', (e) => (testData1 += e))
    observer.on('test', (e) => (testData2 += e + 10))
    observer.emit('test', 10)
    observer.emit('test', 10)
    expect(testData1).toBe(20)
    expect(testData2).toBe(40)
  })

  test('once', () => {
    const observer = sdk.useObserver()
    let testData = 0
    observer.once('test', (e) => (testData += e))
    observer.emit('test', 10)
    observer.emit('test', 10)
    expect(testData).toBe(10)
  })

  test('off', () => {
    const observer = sdk.useObserver()
    let testData = 0
    observer.on('test', (e) => (testData += e))
    observer.emit('test', 10)
    observer.off('test')
    observer.emit('test', 10)
    expect(testData).toBe(10)
  })
})

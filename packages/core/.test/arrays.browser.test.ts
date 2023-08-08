import { describe, expect, test } from 'vitest'
import * as sdk from '../src'
import { range, sortedIndex, unzip } from '../src'

describe('arrays', () => {
  test('head', () => {
    expect(sdk.head([1, 2, 3])).toBe(1)
    expect(sdk.head([])).toBeUndefined()
    expect(sdk.head(null)).toBeUndefined()
  })

  test('initial', () => {
    expect(sdk.initial([1, 2, 3])).toStrictEqual([1, 2])
    expect(sdk.initial([])).toStrictEqual([])
    expect(sdk.initial(null)).toStrictEqual([])
  })

  test('last', () => {
    expect(sdk.last([1, 2, 3])).toBe(3)
    expect(sdk.last([])).toBeUndefined()
    expect(sdk.last(null)).toBeUndefined()
  })

  test('tail', () => {
    expect(sdk.tail([1, 2, 3])).toStrictEqual([2, 3])
    expect(sdk.tail([])).toStrictEqual([])
    expect(sdk.tail(null)).toStrictEqual([])
  })

  test('compact', () => {
    expect(sdk.compact([1, null, undefined, '', false, NaN])).toStrictEqual([1])
    expect(sdk.compact([])).toStrictEqual([])
    expect(sdk.compact(null)).toStrictEqual([])
  })

  test('flatten', () => {
    expect(sdk.flatten([[[[[[[[[[[[1]]]]]]]]]]]])).toStrictEqual([1])
    expect(sdk.flatten([[[1]]], 1)).toStrictEqual([[1]])
    expect(sdk.flatten([[[1]]], 2)).toStrictEqual([1])
    expect(sdk.flatten([], 2)).toStrictEqual([])
    expect(sdk.flatten(null, 2)).toStrictEqual([])
  })

  test('chunk', () => {
    expect(sdk.chunk([1, 2, 3])).toStrictEqual([[1], [2], [3]])
    expect(sdk.chunk([1, 2, 3], 1)).toStrictEqual([[1], [2], [3]])
    expect(sdk.chunk([1, 2, 3], 2)).toStrictEqual([[1, 2], [3]])
    expect(sdk.chunk([1, 2, 3], 3)).toStrictEqual([[1, 2, 3]])
    expect(sdk.chunk([])).toStrictEqual([])
    expect(sdk.chunk(null)).toStrictEqual([])
  })

  test('object', () => {
    expect(
      sdk.object([
        ['id', 1],
        ['name', 'tom']
      ])
    ).toStrictEqual({ id: 1, name: 'tom' })
    expect(sdk.object([])).toStrictEqual({})
    expect(sdk.object(null)).toStrictEqual({})
  })

  test('indexOf', () => {
    expect(sdk.indexOf([1, 2, 3], 1)).toStrictEqual(0)
    expect(sdk.indexOf([1, 2, 3], 2)).toStrictEqual(1)
    expect(sdk.indexOf([1, 2, 3], 3)).toStrictEqual(2)
    expect(sdk.indexOf([])).toStrictEqual(-1)
    expect(sdk.indexOf(null)).toStrictEqual(-1)
  })

  test('lastIndexOf', () => {
    expect(sdk.lastIndexOf([1, 2, 3, 1], 1)).toStrictEqual(3)
    expect(sdk.lastIndexOf([1, 2, 2, 3], 2)).toStrictEqual(2)
    expect(sdk.lastIndexOf([3, 1, 2], 3)).toStrictEqual(0)
    expect(sdk.lastIndexOf([])).toStrictEqual(-1)
    expect(sdk.lastIndexOf(null)).toStrictEqual(-1)
  })

  test('findIndex', () => {
    expect(sdk.findIndex([1, 2, 3])).toStrictEqual(0)
    expect(sdk.findIndex([1, 2, 3], (item) => item > 1)).toStrictEqual(1)
    expect(sdk.findIndex([])).toStrictEqual(-1)
    expect(sdk.findIndex(null)).toStrictEqual(-1)
  })

  test('findLastIndex', () => {
    expect(sdk.findLastIndex([1, 2, 3])).toStrictEqual(2)
    expect(sdk.findLastIndex([1, 2, 3], (item) => item > 1)).toStrictEqual(2)
    expect(sdk.findLastIndex([])).toStrictEqual(-1)
    expect(sdk.findLastIndex(null)).toStrictEqual(-1)
  })

  test('sortedIndex', () => {
    expect(sdk.sortedIndex([10, 20, 30], 15)).toStrictEqual(1)
    expect(
      sdk.sortedIndex(
        [
          { name: 'moe', age: 40 },
          { name: 'curly', age: 60 }
        ],
        { name: 'larry', age: 50 },
        'age'
      )
    ).toStrictEqual(1)
    expect(sdk.sortedIndex([10, 20, 30], null)).toStrictEqual(0)
    expect(sdk.sortedIndex(null, null)).toStrictEqual(0)
  })

  test('difference', () => {
    expect(sdk.difference([1, 2, 3])).toStrictEqual([1, 2, 3])
    expect(sdk.difference([1, 2, 3], [1])).toStrictEqual([2, 3])
    expect(sdk.difference([1, 2, 3], [1, 2, 3])).toStrictEqual([])
    expect(sdk.difference([1, 2, 3], [1], [2], [3])).toStrictEqual([])
    expect(sdk.difference([1, 2, 3], 1)).toStrictEqual([2, 3])
    expect(sdk.difference([1, 2, 3], 1, 2, 3)).toStrictEqual([])
    expect(sdk.difference([1, 2, 3], null)).toStrictEqual([1, 2, 3])
    expect(sdk.difference(null, null)).toStrictEqual([])
  })

  test('intersection', () => {
    expect(sdk.intersection([1, 2, 3])).toStrictEqual([1, 2, 3])
    expect(sdk.intersection([1, 2, 3], [1])).toStrictEqual([1])
    expect(sdk.intersection([1, 2, 3], [1, 2, 3])).toStrictEqual([1, 2, 3])
    expect(sdk.intersection([1, 2, 3], [1], [2], [3])).toStrictEqual([])
    expect(sdk.intersection([1, 2, 3], null)).toStrictEqual([])
    expect(sdk.intersection([1, 2, 3], null, null, null)).toStrictEqual([])
    expect(sdk.intersection([1, 2, 3], null)).toStrictEqual([])
    expect(sdk.intersection(null, null)).toStrictEqual([])
  })

  test('union', () => {
    expect(sdk.union([1, 2, 3], [3])).toStrictEqual([1, 2, 3])
    expect(sdk.union([1, 2], null)).toStrictEqual([1, 2, null])
    expect(sdk.union(null)).toStrictEqual([null])
    expect(sdk.union()).toStrictEqual([])
  })

  test('uniq', () => {
    expect(sdk.uniq([1, 2, 3, 2, 3])).toStrictEqual([1, 2, 3])
    expect(sdk.uniq([])).toStrictEqual([])
    expect(sdk.uniq(null)).toStrictEqual([])
  })

  test('range', () => {
    expect(sdk.range(3)).toStrictEqual([0, 1, 2])
    expect(sdk.range(1, 3)).toStrictEqual([1, 2])
    expect(sdk.range(0, 15, 5)).toStrictEqual([0, 5, 10])
    expect(sdk.range(3, 1)).toStrictEqual([3, 2])
    expect(sdk.range(0, -3)).toStrictEqual([0, -1, -2])
    expect(sdk.range(0, -15, -5)).toStrictEqual([0, -5, -10])
    expect(sdk.range(null)).toStrictEqual([])
  })

  test('unzip', () => {
    expect(
      sdk.unzip([
        ['id', 1],
        ['name', 'tom']
      ])
    ).toStrictEqual([
      ['id', 'name'],
      [1, 'tom']
    ])
    expect(sdk.unzip([])).toStrictEqual([])
    expect(sdk.unzip(null)).toStrictEqual([])
  })

  test('zip', () => {
    expect(sdk.zip(['id', 'id', 'id'], [1, 2, 3])).toStrictEqual([
      ['id', 1],
      ['id', 2],
      ['id', 3]
    ])
    expect(sdk.zip([])).toStrictEqual([])
    expect(sdk.zip(null)).toStrictEqual([])
  })
})

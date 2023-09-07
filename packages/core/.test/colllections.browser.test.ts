import { describe, expect, test } from 'vitest'
import * as sdk from '../src'
import { forEach } from '../src'

describe('collections', () => {
  test('forEach', () => {
    const arr = [1, 2, 3]
    let temp = 0
    sdk.forEach(arr, (value) => {
      temp += value
    })
    expect(temp).toStrictEqual(6)

    sdk.forEach(arr, (value, index) => {
      if (index === 1) {
        return false
      }
      temp += value
    })
    expect(temp).toStrictEqual(7)

    const obj = { num1: 1, num2: 2 }
    const test = []
    forEach(
      obj,
      function (value) {
        test.push(value * this.multiplier)
      },
      { multiplier: 5 }
    )
    expect(test).toStrictEqual([5, 10])

    expect(forEach(null)).toStrictEqual(null)
  })

  test('map', () => {
    const data = sdk.map([1, 2, 3], (value) => value + 1)
    expect(data).toStrictEqual([2, 3, 4])

    const obj = { num1: 1, num2: 2, num3: 3 }
    expect(
      sdk.map(
        obj,
        function (value) {
          return value * this.multiplier
        },
        { multiplier: 5 }
      )
    ).toStrictEqual([5, 10, 15])
    expect(sdk.map(obj, (value, key) => key)).toStrictEqual(['num1', 'num2', 'num3'])

    expect(sdk.map(null)).toStrictEqual([])
  })

  test('reduce', () => {
    const data = sdk.reduce([1, 2, 3], (prev, curr) => prev + curr, 0)
    expect(data).toStrictEqual(6)

    const obj = { num1: 10, num2: 20, num3: 30 }
    expect(sdk.reduce(obj, (prev, curr) => prev + curr, 0)).toStrictEqual(60)
    expect(sdk.reduce(null, null)).toStrictEqual(undefined)
  })

  test('reduceRight', () => {
    const data = sdk.reduceRight([1, 2, 3], (prev, curr) => prev + curr, 0)
    expect(data).toStrictEqual(6)

    const obj = { num1: 10, num2: 20, num3: 30 }
    expect(sdk.reduceRight(obj, (prev, curr) => prev + curr, 0)).toStrictEqual(60)
    expect(sdk.reduceRight(null, null)).toStrictEqual(undefined)
  })

  test('filter', () => {
    const data = sdk.filter([1, 2, 3], (value) => value > 1)
    expect(data).toStrictEqual([2, 3])

    const obj = { num1: 10, num2: 20, num3: 30 }
    expect(
      sdk.filter(
        obj,
        function (value) {
          return value > this.judge
        },
        {
          judge: 10
        }
      )
    ).toStrictEqual([20, 30])

    expect(sdk.filter(null)).toStrictEqual([])
  })

  test('reject', () => {
    const data = sdk.reject([1, 2, 3], (value) => value > 1)
    expect(data).toStrictEqual([1])

    const obj = { num1: 10, num2: 20, num3: 30 }
    expect(
      sdk.reject(
        obj,
        function (value) {
          return value > this.judge
        },
        {
          judge: 10
        }
      )
    ).toStrictEqual([10])

    expect(sdk.reject(null)).toStrictEqual([])
  })

  test('partition', () => {
    const data = sdk.partition([1, 2, 3], (value) => value > 1)
    expect(data).toStrictEqual([[2, 3], [1]])

    const obj = { num1: 10, num2: 20, num3: 30 }
    expect(
      sdk.partition(
        obj,
        function (value) {
          return value > this.judge
        },
        {
          judge: 10
        }
      )
    ).toStrictEqual([[20, 30], [10]])

    expect(sdk.partition(null, null)).toStrictEqual([[], []])
    expect(sdk.partition(null)).toStrictEqual([[], []])
  })

  test('find', () => {
    const data = sdk.find([1, 2, 3], (value) => value > 1)
    expect(data).toStrictEqual(2)

    const obj = { num1: 10, num2: 20, num3: 30 }
    expect(
      sdk.find(
        obj,
        function (value) {
          return value > this.judge
        },
        {
          judge: 10
        }
      )
    ).toStrictEqual(20)
    expect(sdk.find(obj, (value) => value > 100)).toBeUndefined()

    expect(sdk.find(null)).toBeUndefined()
  })

  test('where', () => {
    const arr = [{ id: 1, name: 'x' }, { id: 2 }, { id: 2, name: 'x' }]
    expect(sdk.where(arr, { id: 2 })).toStrictEqual([{ id: 2 }, { id: 2, name: 'x' }])
    expect(sdk.where([{ id: 1 }, { id: 2 }], { id: 1 })).toStrictEqual([{ id: 1 }])
    expect(sdk.where([{ id: 1 }, { id: 2 }], null)).toStrictEqual([{ id: 1 }, { id: 2 }])

    expect(sdk.where(null, null)).toStrictEqual([])
  })

  test('findWhere', () => {
    const arr = [{ id: 1, name: 'x' }, { id: 2 }, { id: 2, name: 'x' }]
    expect(sdk.findWhere(arr, { id: 2 })).toStrictEqual({ id: 2 })
    expect(sdk.findWhere([{ id: 1 }, { id: 2 }], null)).toStrictEqual({ id: 1 })

    expect(sdk.findWhere(null, null)).toBeUndefined()
  })

  test('every', () => {
    const data = [1, 2, 3]
    expect(sdk.every(data, (value) => value > 0)).toStrictEqual(true)
    expect(sdk.every(data, (value) => value > 1)).toStrictEqual(false)

    const obj = { num1: 10, num2: 20, num3: 30 }
    expect(
      sdk.every(
        obj,
        function (value) {
          return value > this.judge
        },
        { judge: 0 }
      )
    ).toStrictEqual(true)
    expect(sdk.every(obj, (value) => value > 10)).toStrictEqual(false)
    expect(sdk.every(null)).toStrictEqual(true)
  })

  test('some', () => {
    const data = [1, 2, 3]
    expect(sdk.some(data, (value) => value > 0)).toStrictEqual(true)
    expect(sdk.some(data, (value) => value > 1)).toStrictEqual(true)
    expect(sdk.some(data, (value) => value > 10)).toStrictEqual(false)

    const obj = { num1: 10, num2: 20, num3: 30 }
    expect(
      sdk.some(
        obj,
        function (value) {
          return value > this.judge
        },
        { judge: 0 }
      )
    ).toStrictEqual(true)
    expect(sdk.some(obj, (value) => value > 10)).toStrictEqual(true)
    expect(sdk.some(obj, (value) => value > 100)).toStrictEqual(false)

    expect(sdk.some(null)).toStrictEqual(false)
  })

  test('contains', () => {
    const data = [1, 2, 3]
    expect(sdk.contains(data, 1)).toStrictEqual(true)
    expect(sdk.contains(data, 2, true)).toStrictEqual(true)
    expect(sdk.contains(data, 10)).toStrictEqual(false)

    const obj = { num1: 10, num2: 20, num3: 30 }
    expect(sdk.contains(obj, 10)).toStrictEqual(true)
    expect(sdk.contains(obj, 20, true)).toStrictEqual(true)
    expect(sdk.contains(obj, 40)).toStrictEqual(false)
    expect(sdk.contains(null)).toStrictEqual(false)
  })

  test('invoke', () => {
    expect(
      sdk.invoke(
        [
          [3, 1, 2],
          [3, 1, 2]
        ],
        'sort'
      )
    ).toStrictEqual([
      [1, 2, 3],
      [1, 2, 3]
    ])
    expect(sdk.invoke([[3, 1, 2]], ['sort'])).toStrictEqual([[1, 2, 3]])
    expect(sdk.invoke([[3, 1, 2]], Array.prototype.sort)).toStrictEqual([[1, 2, 3]])

    expect(sdk.invoke(null, null)).toStrictEqual([])
    expect(sdk.invoke(null, undefined)).toStrictEqual([])
  })

  test('pluck', () => {
    expect(
      sdk.pluck(
        [
          { id: 1, name: 'tom' },
          { id: 2, name: 'jerry' }
        ],
        'name'
      )
    ).toStrictEqual(['tom', 'jerry'])

    expect(sdk.pluck(null, null)).toStrictEqual([])
    expect(sdk.pluck(null, undefined)).toStrictEqual([])
  })

  test('shuffle', () => {
    expect(sdk.shuffle([3, 2, 1])).toBeDefined()

    expect(sdk.shuffle(null)).toStrictEqual([])
  })

  test('sample', () => {
    const arr = [1, 2, 3]
    expect(sdk.sample(arr)).toBeDefined()
    expect(sdk.sample(arr, 3)).toBeDefined()

    expect(sdk.sample(null)).toStrictEqual([])
  })

  test('sortBy', () => {
    const arr = [2, 1, 3]
    expect(sdk.sortBy(arr, true)).toStrictEqual([1, 2, 3])
    expect(sdk.sortBy(arr, false)).toStrictEqual([3, 2, 1])

    expect(
      sdk.sortBy(
        arr,
        true,
        function (value, index) {
          if (index === 1) {
            return value + this.judge
          }
          return value
        },
        { judge: 10 }
      )
    ).toStrictEqual([2, 3, 1])

    const obj = [
      { id: 1, sort: 2 },
      { id: 1, sort: 3 },
      { id: 1, sort: 1 }
    ]
    expect(sdk.sortBy(obj, true, 'sort')).toStrictEqual([
      { id: 1, sort: 1 },
      { id: 1, sort: 2 },
      { id: 1, sort: 3 }
    ])
    expect(sdk.sortBy(obj, false, 'sort')).toStrictEqual([
      { id: 1, sort: 3 },
      { id: 1, sort: 2 },
      { id: 1, sort: 1 }
    ])

    expect(sdk.sortBy(null, undefined)).toStrictEqual([])
  })

  test('groupBy', () => {
    const arr = [1, 2, 3]
    expect(sdk.groupBy(arr)).toStrictEqual({ 1: [1], 2: [2], 3: [3] })

    const strArr = ['tom', 'jerry', 'home']
    expect(sdk.groupBy(strArr, 'length')).toStrictEqual({ 3: ['tom'], 4: ['home'], 5: ['jerry'] })

    const obj = [
      { id: 1, group: 1 },
      { id: 2, group: 2 },
      { id: 3, group: 3 }
    ]
    expect(
      sdk.groupBy(
        obj,
        function (value) {
          return value.group > this.judge
        },
        { judge: 2 }
      )
    ).toStrictEqual({
      true: [{ id: 3, group: 3 }],
      false: [
        { id: 1, group: 1 },
        { id: 2, group: 2 }
      ]
    })
  })

  test('indexBy', () => {
    const arr = [1, 2, 3]
    expect(sdk.indexBy(arr)).toStrictEqual({ 1: 1, 2: 2, 3: 3 })

    const strArr = ['tom', 'jerry', 'home']
    expect(sdk.indexBy(strArr, 'length')).toStrictEqual({ 3: 'tom', 4: 'home', 5: 'jerry' })

    const obj = [
      { id: 1, group: 1 },
      { id: 2, group: 2 }
    ]
    expect(
      sdk.indexBy(
        obj,
        function (value) {
          return value.group > this.judge
        },
        { judge: 1 }
      )
    ).toStrictEqual({
      true: { id: 2, group: 2 },
      false: { id: 1, group: 1 }
    })
  })

  test('countBy', () => {
    const arr = [1, 2, 3]
    expect(sdk.countBy(arr)).toStrictEqual({ 1: 1, 2: 1, 3: 1 })

    const strArr = ['tom', 'jerry', 'home']
    expect(sdk.countBy(strArr, 'length')).toStrictEqual({ 3: 1, 4: 1, 5: 1 })

    const obj = [
      { id: 1, group: 1 },
      { id: 2, group: 2 },
      { id: 3, group: 3 }
    ]
    expect(
      sdk.countBy(
        obj,
        function (value) {
          return value.group > this.judge
        },
        { judge: 2 }
      )
    ).toStrictEqual({
      true: 1,
      false: 2
    })
  })

  test('max', () => {
    const arr = [1, 2, 3]
    expect(sdk.max(arr)).toStrictEqual(3)

    const obj = [
      { id: 1, num: 10 },
      { id: 2, num: 20 },
      { id: 3, num: 30 }
    ]
    expect(
      sdk.max(obj, function (value) {
        return value.num
      })
    ).toStrictEqual({ id: 3, num: 30 })
    expect(
      sdk.max(
        obj,
        function (value, index) {
          if (index === 1) {
            return value.num * this.judge
          }
          return value.num
        },
        { judge: 10 }
      )
    ).toStrictEqual({ id: 2, num: 20 })

    expect(sdk.max(null)).toStrictEqual(-Infinity)
  })

  test('min', () => {
    const arr = [1, 2, 3]
    expect(sdk.min(arr)).toStrictEqual(1)

    const obj = [
      { id: 1, num: 10 },
      { id: 2, num: 20 },
      { id: 3, num: 30 }
    ]
    expect(
      sdk.min(obj, function (value) {
        return value.num
      })
    ).toStrictEqual({ id: 1, num: 10 })
    expect(
      sdk.min(
        obj,
        function (value, index) {
          if (index === 0) {
            return value.num * this.judge
          }
          return value.num
        },
        { judge: 10 }
      )
    ).toStrictEqual({ id: 2, num: 20 })

    expect(sdk.min(null)).toStrictEqual(Infinity)
  })

  test('size', () => {
    const arr = [1, 2, 3]
    expect(sdk.size(arr)).toStrictEqual(3)

    const obj = {
      id: 1,
      name: 'tom'
    }
    expect(sdk.size(obj)).toStrictEqual(2)

    expect(sdk.size(null)).toStrictEqual(0)
  })
})

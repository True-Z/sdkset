import { describe, expect, test } from 'vitest'
import * as sdk from '../src'
import dayjs = require('dayjs')

const customDate = new Date(2012, 11, 21, 0, 0, 0)

describe('dayjs', () => {
  test('useDayjs', async () => {
    expect(sdk.useDayjs({ time: customDate, change: 'dayjs' })).toStrictEqual(dayjs(customDate))
    expect(sdk.useDayjs({ time: customDate, change: 'dayjs' })).toStrictEqual(dayjs(customDate))
    expect(sdk.useDayjs({ time: customDate, change: 'date' })).toStrictEqual(customDate)
    expect(sdk.useDayjs({ time: customDate, change: 'timeStamp' })).toBe(1356019200000)
    expect(sdk.useDayjs({ time: customDate, change: 'format' })).toBe('2012-12-21 00:00:00')
    expect(sdk.useDayjs({ time: customDate, change: 'format', format: 'YYYY-MM-DD' })).toBe('2012-12-21')
    expect(sdk.useDayjs({ time: customDate, change: 'format', format: 'YYYY-MM-DD', useUTC: true })).toBe('2012-12-20')
  })

  test('display', () => {
    expect(sdk.customDate('dateTime', { change: 'format' })).toBeTypeOf('object')
    expect(sdk.customDate('date', { change: 'format' })).toBeTypeOf('object')
    expect(sdk.customDate('thisDay', { change: 'format' })).toBeTypeOf('object')
    expect(sdk.customDate('thisMonth', { change: 'format' })).toBeTypeOf('object')
    expect(sdk.customDate('thisWeek', { change: 'format' })).toBeTypeOf('object')
    expect(sdk.customDate('thisYear', { change: 'format' })).toBeTypeOf('object')
    expect(sdk.customDate('thisMonth', { time: '2020-11-25', change: 'format', format: 'YYYY-MM-DD' })).toStrictEqual([
      '2020-11-01',
      '2020-11-25'
    ])
  })

  test('accessor', () => {
    expect(sdk.getDate('year', { time: '2012-12-21' })).toBe(2012)
    expect(sdk.getDate('month', { time: '2012-12-21' })).toBe(11)
    expect(sdk.getDate('days', { time: '2012-12-21' })).toBe(5)

    expect(sdk.setDate('year', 2012, { time: '2011-12-21' }).format('YYYY-MM-DD HH:mm:ss')).toBe('2012-12-21 00:00:00')
    expect(sdk.setDate('year', 2012, { time: '2011-12-21' }).format('YYYY-MM-DD')).toBe('2012-12-21')
  })

  test('operate', () => {
    expect(sdk.startDate('year', { time: '2012-12-21', change: 'format', format: 'YYYY-MM-DD' })).toBe('2012-01-01')

    expect(sdk.endDate('year', { time: '2012-12-21', change: 'format', format: 'YYYY-MM-DD' })).toBe('2012-12-31')

    expect(sdk.addDate(1, 'year', { time: '2012-12-21', change: 'format', format: 'YYYY-MM-DD' })).toBe('2013-12-21')

    expect(sdk.subtractDate(1, 'year', { time: '2012-12-21', change: 'format', format: 'YYYY-MM-DD' })).toBe(
      '2011-12-21'
    )
  })
})

import nativeDayjs from 'dayjs'
import { describe, expect, test } from 'vitest'

import * as sdk from './index'

describe('useDayjs', () => {
  test('basis', async () => {
    const customDate = new Date(2012, 11, 21, 0, 0, 0)
    const dayjs = sdk.useDayjs(customDate)
    expect(dayjs).toStrictEqual(nativeDayjs(customDate))

    const dayjsToDate = sdk.useDayjs(customDate)
    expect(dayjsToDate.toDate()).toStrictEqual(customDate)

    const dayjsToTimeStamp = sdk.useDayjs(customDate)
    expect(dayjsToTimeStamp.toDate().getTime()).toBe(1356019200000)

    const dayjsToFormat = sdk.useDayjs(customDate, { template: 'YYYY-MM-DD HH:mm:ss' })
    expect(dayjsToFormat.format()).toBe('2012-12-21 00:00:00')
    expect(dayjsToFormat.format('YYYY-MM-DD')).toBe('2012-12-21')
  })

  test('accessor', () => {
    const dayjs = sdk.useDayjs('2012-12-21')
    expect(dayjs.get('year')).toBe(2012)
    expect(dayjs.get('month')).toBe(11)
    expect(dayjs.get('days')).toBe(5)

    expect(dayjs.set('year', 2011).get('year')).toBe(2011)
    expect(dayjs.set('month', 10).get('month')).toBe(10)
  })

  test('operate', () => {
    const dayjs1 = sdk.useDayjs('2012-12-21', { template: 'YYYY-MM-DD' })
    const dayjs2 = sdk.useDayjs('2012-12-21 00:00:00', { template: 'YYYY-MM-DD HH:mm:ss' })

    expect(dayjs1.startOf('year').format()).toBe('2012-01-01')
    expect(dayjs1.endOf('year').format()).toBe('2012-12-31')

    expect(dayjs2.startOf('year').format()).toBe('2012-01-01 00:00:00')
    expect(dayjs2.endOf('year').format()).toBe('2012-12-31 23:59:59')
    expect(dayjs2.add(1, 'year').format()).toBe('2013-12-21 00:00:00')
    expect(dayjs2.subtract(1, 'year').format()).toBe('2011-12-21 00:00:00')

    expect(dayjs1.add(1, 'year').format()).toBe('2013-12-21')
    expect(dayjs1.subtract(1, 'year').format()).toBe('2011-12-21')
  })
})

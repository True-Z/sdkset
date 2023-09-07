import { describe, expect, test } from 'vitest'

import nativeDayjs from 'dayjs'

import * as sdk from '../src'
import { useDayjs } from '../src'

describe('dayjs', () => {
  test('useDayjs', async () => {
    const customDate = new Date(2012, 11, 21, 0, 0, 0)
    const dayjs = useDayjs(customDate)
    expect(dayjs.self()).toStrictEqual(nativeDayjs(customDate))
    expect(dayjs.value()).toStrictEqual(nativeDayjs(customDate))

    const dayjsToDate = useDayjs(customDate, { convers: 'date' })
    expect(dayjsToDate.value()).toStrictEqual(customDate)

    const dayjsToTimeStamp = useDayjs(customDate, { convers: 'timeStamp' })
    expect(dayjsToTimeStamp.value()).toBe(1356019200000)

    const dayjsToFormat = useDayjs(customDate, { convers: 'format' })
    expect(dayjsToFormat.value()).toBe('2012-12-21 00:00:00')
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
    const dayjs = sdk.useDayjs('2012-12-21', { convers: 'format', template: 'YYYY-MM-DD' })

    expect(dayjs.startOf('year').value()).toBe('2012-01-01')

    expect(dayjs.endOf('year').value()).toBe('2012-12-31')

    expect(dayjs.add(1, 'year').value()).toBe('2013-12-21')

    expect(dayjs.subtract(1, 'year').value()).toBe('2011-12-21')
  })
})

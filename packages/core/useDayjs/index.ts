import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import dayOfYear from 'dayjs/plugin/dayOfYear.js'
import quarterOfYear from 'dayjs/plugin/quarterOfYear.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'

import { initDateFormat, WrapperDateFormat } from './helpers'

import type { CreateDayjsOption, DayjsDate } from './types'

export type * from './types'

export type { WrapperDateFormat } from './helpers'

try {
  dayjs.extend(quarterOfYear)
  dayjs.extend(advancedFormat)
  dayjs.extend(weekOfYear)
  dayjs.extend(dayOfYear)
} catch {
  console.warn(
    'browser 环境下，如需使用`day.js`插件，请参阅：https://day.js.org/docs/zh-CN/plugin/loading-into-browser'
  )
}

/**
 * 返回一个[day.js](https://dayjs.fenxianglu.cn/)日期格式化包装器对象，
 * 可以通过添加[day.js 插件](https://dayjs.fenxianglu.cn/category/getset.html)为包装器添加功能。
 * 包装器自带插件：
 *
 * [QuarterOfYear（.quarter() 返回/设置季度 & quarter unit）](https://dayjs.fenxianglu.cn/category/plugin.html#quarterofyear)
 *
 * [advancedFormat（为 format 提供更多的格式选项）](https://dayjs.fenxianglu.cn/category/plugin.html#advancedformat)
 *
 * [WeekOfYear（.week() 返回/设置年中第几周）](https://dayjs.fenxianglu.cn/category/plugin.html#weekofyear)
 *
 * [dayOfYear（.dayOfYear() 返回/设置年中第几天））](https://dayjs.fenxianglu.cn/category/plugin.html#dayofyear)
 *
 * @example
 * const dayjs = useDayjs(new Date('2012-01-21 00:00:00'), { convers: 'format' })
 *
 * dayjs.format()
 * => '2012-12-21 00:00:00'
 *
 * dayjs.add('year', 1).value()
 * => '2013-12-21 00:00:00'
 *
 * @param [date] 给定时间
 * @param [option] 包装器选项
 * @param [option.convers = 'dayjs'] 转换格式
 * @param [option.template = 'YYYY-MM-DD HH:mm:ss'] 格式化模板
 *
 * @default
 * useDayjs(new Date(), {
 *   convers: 'dayjs', // 转换格式
 *   template: 'YYYY-MM-DD HH:mm:ss' // 格式化模板
 * })
 */
export function useDayjs<C extends CreateDayjsOption>(date?: DayjsDate, option?: C) {
  const { convers, template } = initDateFormat(option)

  const dayjsInstance = dayjs(date ?? new Date())

  return new WrapperDateFormat<C>(dayjsInstance, convers, template)
}

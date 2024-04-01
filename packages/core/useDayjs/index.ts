import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import dayOfYear from 'dayjs/plugin/dayOfYear.js'
import quarterOfYear from 'dayjs/plugin/quarterOfYear.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'

import { initDayjs, wrapperDayjs } from './helpers'
import { CreateDayjsOption, DayjsDate } from './types'

export * from './types'

try {
  dayjs.extend(quarterOfYear)
  dayjs.extend(advancedFormat)
  dayjs.extend(weekOfYear)
  dayjs.extend(dayOfYear)
} catch {
  // browser 环境下，如需使用`day.js`插件，请参阅：https://day.js.org/docs/zh-CN/plugin/loading-into-browser
  console.warn(
    'In browser environment, if you need to use the `day.js` plug-in, please refer to: https://day.js.org/docs/zh-CN/plugin/loading-into-browser'
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
 * const dayjs = useDayjs(new Date('2012-01-21 00:00:00'), { template: 'YYYY-MM-DD HH:mm:ss' })
 *
 * dayjs.add('year', 1).format() // 未传递参数按照 template 配置返回
 * => '2013-12-21 00:00:00'
 *
 * dayjs other // 其余使用方法与 dayjs 一致
 *
 * @param date 给定时间
 * @param [option] 包装器选项
 * @param [option.template = 'M/DD/YY H:mm:ss A Z'] 格式化模板
 *
 * @default
 * useDayjs(new Date(), {
 *   template: 'MM/DD/YY H:mm:ss A Z' // 格式化模板
 * })
 */
export function useDayjs(date?: DayjsDate, option?: CreateDayjsOption) {
  const dayjsInstance = dayjs(date ?? new Date())

  return wrapperDayjs(dayjsInstance, initDayjs(option))
}

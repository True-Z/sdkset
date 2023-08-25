import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import dayOfYear from 'dayjs/plugin/dayOfYear.js'
import quarterOfYear from 'dayjs/plugin/quarterOfYear.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'

import { dayjsChangeTo, init } from '../helpers'

import type { DayjsConfig, DayjsTo } from '../types'

try {
  dayjs.extend(quarterOfYear)
  dayjs.extend(advancedFormat)
  dayjs.extend(weekOfYear)
  dayjs.extend(dayOfYear)
} catch {
  console.warn(
    'browser 环境下，需自行添加安装 dayjs 包装器插件：https://day.js.org/docs/zh-CN/plugin/loading-into-browser'
  )
}

/**
 * 返回一个[day.js](https://dayjs.fenxianglu.cn/)包装器对象，
 * 通过传入`config`配置对象给定时间和其他配置项，
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
 * useDayjs({ time: '2012-12-21', change: 'format' })
 * => '2012-12-21 00:00:00'
 *
 * @param config 包装器配置
 * @param config.change 转换格式
 * @param config.format 格式化字符串
 * @param config.useUTC 使用 UTC 模式
 */
export function useDayjs<C extends DayjsConfig>(config?: C) {
  const { time, change, format } = init(config)
  return dayjsChangeTo(change, dayjs(time), format) as DayjsTo<C['change']>
}
//
// const date = useDayjs({
//   change: 'date',
//   format: 'YYYY-MM-DD HH:mm:ss'
// })
//
// interface Demo {
//   type: 'custom' | 'dayjs'
// }
// const changeType = {
//   custom: (date: string) => {
//     const data = dayjs(date)
//     return () => {}
//   },
//   dayjs: (date: string) => dayjs(date)
// }
// export function useDayjsUp(date?: DayjsTime, option?: DayjsConfig) {
//   if (option) {
//     return customDate(option)
//   }
//   return dayjs(date)
// }
//
// useDayjsUp()

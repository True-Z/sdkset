import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import dayOfYear from 'dayjs/plugin/dayOfYear.js'
import quarterOfYear from 'dayjs/plugin/quarterOfYear.js'
import utc from 'dayjs/plugin/utc.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'

import { dayjsChangeTo, defineConfig } from '../_'

import type { DayjsConfig, DayjsTo } from '../types'

dayjs.extend(quarterOfYear)
dayjs.extend(advancedFormat)
dayjs.extend(weekOfYear)
dayjs.extend(dayOfYear)
dayjs.extend(utc)

/**
 * 返回一个[day.js](https://dayjs.fenxianglu.cn/)包装器对象。
 * 包装器自带插件：
 * [QuarterOfYear（.quarter() 返回/设置季度 & quarter unit）](https://dayjs.fenxianglu.cn/category/plugin.html#quarterofyear)
 *
 * [advancedFormat（为提供 format 更多的格式选项）](https://dayjs.fenxianglu.cn/category/plugin.html#advancedformat)
 *
 * [WeekOfYear（.week() 返回/设置年中第几周）](https://dayjs.fenxianglu.cn/category/plugin.html#weekofyear)
 *
 * [dayOfYear（.dayOfYear() 返回/设置年中第几天））](https://dayjs.fenxianglu.cn/category/plugin.html#dayofyear)
 *
 * [UTC（世界时）](https://dayjs.fenxianglu.cn/category/plugin.html#utc)
 *
 * 可以通过添加[Day.js 插件](https://dayjs.fenxianglu.cn/category/getset.html)为包装器添加功能。
 * 通过传入`config`配置对象给定时间和其他配置项。
 *
 * @example
 * useDayjs({ time: '2012-12-21', change: 'format' })
 * => '2012-12-21 00:00:00'
 *
 * @param config 包装器配置
 * @param config.time 给定时间
 * @param config.change 转换格式
 * @param config.format 格式化字符串
 * @param config.useUTC 使用 UTC 模式
 */
export function useDayjs<C extends DayjsConfig>(config?: C) {
  const { time, change, format, useUTC } = defineConfig(config)
  if (useUTC) {
    return dayjsChangeTo(change, dayjs(time).utc(), format) as DayjsTo<C['change']>
  }
  return dayjsChangeTo(change, dayjs(time), format) as DayjsTo<C['change']>
}

console.log('🚀 ~~ path: useDayjs.ts ~ line: 52 : ', useDayjs({ time: '2020', change: 'format' }))

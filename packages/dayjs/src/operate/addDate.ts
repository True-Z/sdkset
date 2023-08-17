import dayjs from 'dayjs'

import { dayjsChangeTo, defineConfig } from '../helpers'

import type { DayjsConfig, DayjsTo } from '../types'
import type { OpUnitType, QUnitType } from 'dayjs'

/**
 * 返回给定时间后X年/季度/月/周/天的转换格式数据。
 * 通过传入`config`配置对象给定时间和其他配置项。
 *
 * @example
 * addDate(1, 'day', { time: '2012-12-20', change: 'format' })
 * => '2012-12-21 00:00:00'
 *
 * @param timeVal 时间数值
 * @param timeUnit 时间单位
 * @param config 包装器配置
 * @param config.time 给定时间
 * @param config.change 转换格式
 * @param config.format 格式化字符串
 * @param config.useUTC 使用 UTC 模式
 */
export function addDate<C extends DayjsConfig>(timeVal: number, timeUnit: QUnitType | OpUnitType, config?: C) {
  const { time, change, format, useUTC } = defineConfig(config)
  if (useUTC) {
    return dayjsChangeTo(
      change,
      dayjs(time)
        .add(timeVal, timeUnit as never)
        .utc(),
      format
    ) as DayjsTo<C['change']>
  }
  return dayjsChangeTo(change, dayjs(time).add(timeVal, timeUnit as never), format) as DayjsTo<C['change']>
}

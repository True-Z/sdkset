import dayjs from 'dayjs'

import { defineConfig } from '../_'

import type { DayjsConfig } from '../types'
import type { UnitType } from 'dayjs'

/**
 * 返回一个`day.js`对象，`day.js`对象中通用的`setter`，调用后会返回一个修改后的新实例。支持链式调用。各个传入的单位对大小写不敏感，支持缩写和复数。
 * 通过传入`config`配置对象给定时间和其他配置项。
 *
 * @example
 * setDate(3, 'month').format('YYYY-MM-DD HH:mm:ss')
 * => '2012-04-01 00:00:00' // 月份为 0 ~ 11
 *
 * @param timeVal 时间数值
 * @param timeUnit 时间单位
 * @param config 包装器配置
 * @param config.time 给定时间
 * @param config.useUTC 是否使用 UTC（时区）模式
 */
export function setDate(timeUnit: UnitType, timeVal: number, config?: Omit<DayjsConfig, 'change' | 'format'>) {
  const { time, useUTC } = defineConfig(config)
  if (useUTC) {
    return dayjs(time).utc().set(timeUnit, timeVal)
  }
  return dayjs(time).set(timeUnit, timeVal)
}

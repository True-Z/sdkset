import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import dayOfYear from 'dayjs/plugin/dayOfYear.js'
import quarterOfYear from 'dayjs/plugin/quarterOfYear.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'

import { initDayjs, WrapperDayjs } from './helpers'

import type { CreateDayjsOption, DayjsDate } from './types'

try {
  dayjs.extend(quarterOfYear)
  dayjs.extend(advancedFormat)
  dayjs.extend(weekOfYear)
  dayjs.extend(dayOfYear)
} catch {
  console.info('browser 环境下，如需使用插件，请参阅：https://day.js.org/docs/zh-CN/plugin/loading-into-browser')
}

/**
 * 返回一个[day.js](https://dayjs.fenxianglu.cn/)包装器对象，
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
 * @method
 * `dayjs.self(): DayjsInstance`
 *
 * 返回`day.js`实例自身。
 *
 * `dayjs.value(): DayjsTypeTo`
 *
 * 返回转换格式后的`day.js`实例值。
 *
 * `dayjs.get(unit): number`
 *
 * 返回一个数值，数值由包装器实例中`day.js`对象相应信息的`getter`组成。各个传入的单位对大小写不敏感，支持缩写和复数。请注意，缩写是区分大小写的。
 *
 * `dayjs.set(unit, value): DayjsWrapper`
 *
 * 返回一个修改`day.js`对象后的包装器实例，支持链式调用。各个传入的单位对大小写不敏感，支持缩写和复数。
 *
 * `dayjs.add(value, unit): DayjsWrapper`
 *
 * 返回增加一定时间的`day.js`对象包装器实例。
 *
 * `dayjs.subtract(value, unit): DayjsWrapper`
 *
 * 返回减去一定时间的`day.js`对象包装器实例。
 *
 * `dayjs.startOf(unit): DayjsWrapper`
 *
 * 返回给定时间开始的`day.js`对象包装器实例。
 *
 * `dayjs.endOf(unit): DayjsWrapper`
 *
 * 返回给定时间结束的`day.js`对象包装器实例。
 *
 * `dayjs.format(template): string`
 *
 * 根据传入的占位符返回格式化后的日期字符串。
 *
 * @example
 * const dayjs = useDayjs('2012-01-21 00:00:00', { convers: 'format' })
 *
 * dayjs.format()
 * => '2012-12-21 00:00:00'
 *
 * dayjs.add('year', 1).value()
 * => '2013-12-21 00:00:00'
 *
 * @param date 给定时间
 * @param option 包装器选项
 * @param option.convers 转换格式（default：'dayjs'）
 * @param option.template 格式化模板（default: 'YYYY-MM-DD HH:mm:ss'）
 */
export function useDayjs<C extends CreateDayjsOption>(date?: DayjsDate, option?: C) {
  const { convers, template } = initDayjs(option)

  const dayjsInstance = dayjs(date ?? undefined)

  return new WrapperDayjs<C>(dayjsInstance, convers, template)
}

import type { CreateDayjsOption, DayjsConvers, DayjsTemplate, DayjsTypeTo } from '../types'
import type { Dayjs, OpUnitType, QUnitType, UnitType } from 'dayjs'

const conversMethods = {
  dayjs: (dayjsInstance: Dayjs) => dayjsInstance,
  format: (dayjsInstance: Dayjs, template: DayjsTemplate) => dayjsInstance.format(template),
  date: (dayjsInstance: Dayjs) => dayjsInstance.toDate(),
  timeStamp: (dayjsInstance: Dayjs) => dayjsInstance.toDate().getTime()
}

/** 包装器类。 */
export class WrapperDateFormat<C extends CreateDayjsOption> {
  /** `day.js`实例。 */
  get self() {
    return this.#dayjs
  }

  readonly #dayjs: Dayjs

  readonly #convers: DayjsConvers

  readonly #template: DayjsTemplate

  constructor(dayjsInstance: Dayjs, convers: DayjsConvers, template: DayjsTemplate) {
    this.#dayjs = dayjsInstance
    this.#convers = convers
    this.#template = template
  }

  /** 包装器内部转换。 */
  #conversTo(dayjs: Dayjs): DayjsTypeTo<C> {
    return conversMethods[this.#convers](dayjs, this.#template) as DayjsTypeTo<C>
  }

  /**
   * 返回转换格式后的`day.js`实例值。
   *
   * @example
   * useDayjs('2012-12-21 00:00:00', { convers: 'timeStamp' }).value()
   * => 1356019200000
   */
  value(): DayjsTypeTo<C> {
    return this.#conversTo(this.#dayjs)
  }

  /**
   * 返回一个数值，数值由包装器实例中`day.js`对象相应信息的`getter`组成。各个传入的单位对大小写不敏感，支持缩写和复数。请注意，缩写是区分大小写的。
   *
   * @example
   * useDayjs('2012-01-01').get('month')
   * => 0 // 月份为 0 ~ 11
   *
   * @param unit 时间单位
   */
  get(unit: UnitType): number {
    return this.#dayjs.get(unit)
  }

  /**
   * 返回一个修改`day.js`对象后的包装器实例，支持链式调用。各个传入的单位对大小写不敏感，支持缩写和复数。
   *
   * @example
   * useDayjs('2020-1-1').set('year', 2012).set('month', 2).format('YYYY-MM-DD')
   * => '2012-03-01' // 月份为 0 ~ 11
   *
   * @param value 时间数值
   * @param unit 时间单位
   */
  set(unit: UnitType, value: number): WrapperDateFormat<C> {
    return new WrapperDateFormat(this.#dayjs.set(unit, value), this.#convers, this.#template)
  }

  /**
   * 返回增加一定时间的`day.js`对象包装器实例。
   *
   * @example
   * useDayjs('2012-12-21 00:00:00').add(1, 'day').value()
   * => '2012-12-22 00:00:00'
   *
   * @param value 时间数值
   * @param unit 时间单位
   */
  add(value: number, unit: QUnitType | OpUnitType): WrapperDateFormat<C> {
    return new WrapperDateFormat(this.#dayjs.add(value, unit as never), this.#convers, this.#template)
  }

  /**
   * 返回减去一定时间的`day.js`对象包装器实例。
   *
   * @example
   * useDayjs('2012-12-21 00:00:00').subtractDate(1, 'day').value()
   * => '2012-12-20 00:00:00'
   *
   * @param value 时间数值
   * @param unit 时间单位
   */
  subtract(value: number, unit: QUnitType | OpUnitType): WrapperDateFormat<C> {
    return new WrapperDateFormat(this.#dayjs.subtract(value, unit as never), this.#convers, this.#template)
  }

  /**
   * 返回给定时间开始的`day.js`对象包装器实例。
   *
   * @example
   * useDayjs('2012-12-21 00:00:00').startOf('month').value()
   * => '2012-12-01 00:00:00'
   *
   * @param unit 时间单位
   */
  startOf(unit: QUnitType | OpUnitType): WrapperDateFormat<C> {
    return new WrapperDateFormat(this.#dayjs.startOf(unit as never), this.#convers, this.#template)
  }

  /**
   * 返回给定时间结束的`day.js`对象包装器实例。
   *
   * @example
   * useDayjs('2012-12-21 00:00:00').endOf('month').value()
   * => '2012-12-31 00:00:00'
   *
   * @param unit 时间单位
   */
  endOf(unit: QUnitType | OpUnitType): WrapperDateFormat<C> {
    return new WrapperDateFormat(this.#dayjs.endOf(unit as never), this.#convers, this.#template)
  }

  /**
   * 根据传入的占位符返回格式化后的日期字符串。
   *
   * @example
   * useDayjs('2012-12-21 00:00:00').format('YYYY-MM-DD')
   * => '2012-12-21'
   *
   * @param template 时间单位
   */
  format(template?: string): string {
    return this.#dayjs.format(template ?? this.#template)
  }
}

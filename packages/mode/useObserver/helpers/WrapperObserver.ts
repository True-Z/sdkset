import type { Dictionary, Func } from '@sdkset/types'

/** 包装器类。 */
export class WrapperObserver {
  #eventChannel: Dictionary<Func[]>

  constructor() {
    this.#eventChannel = {}
  }

  /**
   * 订阅特定事件，待特定事件发布时触发相应订阅的回调。
   *
   * @example
   * observer.on('open', func)
   * => eventChannel 'open' event append func
   *
   * @param event 事件名称
   * @param callback 订阅回调
   */
  on(event: string, callback: Func) {
    if (typeof callback !== 'function') {
      // 事件 ${event} 订阅的回调不是函数
      console.error(new TypeError(`The callback subscribed to for event ${event} is not a function`))
      return
    }

    const callbackList = this.#eventChannel[event]
    if (callbackList) {
      callbackList.push(callback)
    } else {
      this.#eventChannel[event] = [callback]
    }
  }

  /**
   * 订阅特定事件，待特定事件发布时触发一次相应订阅的回调。
   *
   * @example
   * observer.once('open', func)
   * => eventCenter 'open' event append func
   *
   * observer.emit('open', func)
   * => No operation
   *
   * @param event 事件名称
   * @param callback 订阅回调
   */
  once(event: string, callback: Func) {
    if (typeof callback !== 'function') {
      // 事件 ${event} 订阅的回调不是函数
      console.error(new TypeError(`The callback subscribed to for event ${event} is not a function`))
      return
    }
    const callbackConvers = (...params: unknown[]) => {
      callback.apply(this, params)
      this.off(event)
    }
    this.on(event, callbackConvers)
  }

  /**
   * 发布特定事件，触发相应订阅回调。
   *
   * @example
   * observer.on('open', func)
   * ...
   * observer.emit('open')
   * => func()
   *
   * @param event 事件名称
   * @param params 回调参数
   */
  emit(event: string, ...params: unknown[]) {
    if (this.#eventChannel[event]) {
      const callbackList = this.#eventChannel[event]
      for (let i = 0, { length } = callbackList; i < length; i++) {
        callbackList[i].apply(this, params)
      }
    }
  }

  /**
   * 取消订阅特定事件，没有传递`event`参数则取消全部。
   *
   * @example
   * observer.emit('open')
   * => func()
   *
   * observer.off('open')
   * observer.emit('open')
   * => No operation
   *
   * @param event 事件名或事件名组成的数组
   */
  off(...event: string[]) {
    event = event.flat()
    if (!event.length) {
      this.#eventChannel = {}
    }
    for (let i = 0, { length } = event; i < length; i++) {
      const currKey = event[i]
      if (this.#eventChannel[currKey]) {
        this.#eventChannel[currKey] = []
      }
    }
  }
}

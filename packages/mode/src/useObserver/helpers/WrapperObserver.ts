import type { Dictionary, Func } from '@sdkset/types'

/** 包装器类 */
export class WrapperObserver {
  #eventChannel: Dictionary<Func[]>

  constructor() {
    this.#eventChannel = {}
  }

  /**
   * 订阅特定事件，待特定事件发布时触发相应订阅的回调。
   *
   * @example
   * const observer = useObserver()
   *
   * observer.on('open', func)
   * => eventCenter 'open' event append func
   *
   * @param event 事件名称
   * @param callback 订阅回调
   */
  on(event: string, callback: Func) {
    if (typeof callback !== 'function') {
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
   * const observer = useObserver()
   *
   * observer.onOnce('open', func)
   * => eventCenter 'open' event append func
   *
   * observer.dependOnce('open', func)
   * => No response
   *
   * @param event 事件名称
   * @param callback 订阅回调
   */
  once(event: string, callback: Func) {
    if (typeof callback !== 'function') {
      console.error(new TypeError(`The callback subscribed to for event ${event} is not a function`))
      return
    }
    const callbackConvers = (params: unknown) => {
      callback(params)
      this.off(event)
    }
    this.on(event, callbackConvers)
  }

  /**
   * 发布特定事件，触发相应订阅回调。
   *
   * @example
   * const observer = useObserver()
   *
   * observer.depend('open', func)
   * ...
   * observer.notify('open')
   * => func()
   *
   * @param event 事件名称
   * @param params 回调参数
   */
  emit(event: string, params?: unknown) {
    if (this.#eventChannel[event]) {
      const callbackList = this.#eventChannel[event]
      for (let i = 0, { length } = callbackList; i < length; i++) {
        callbackList[i](params)
      }
    }
  }

  /**
   * 取消订阅特定事件。
   *
   * @example
   * ...
   * observer.emit('open')
   * => func()
   *
   * observer.off('open')
   * observer.emit('open')
   * => No response
   *
   * @param event 事件名或事件名组成的数组，不传则默认所有
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

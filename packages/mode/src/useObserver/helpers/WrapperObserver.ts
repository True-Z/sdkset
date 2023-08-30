import type { Dictionary, Func } from '@sdkset/types'

/** 包装器类 */
export class WrapperObserver {
  #eventCenter: Dictionary<Func[]>

  constructor() {
    this.#eventCenter = {}
  }

  /**
   * 订阅特定事件，待特定事件发布时触发相应订阅的回调，`once`参数为`true`时订阅回调只会触发一次。
   *
   * @example
   * const observer = useObserver()
   *
   * observer.depend('open', func)
   * => eventCenter 'open' event append func
   *
   * @param event 事件
   * @param handle 订阅回调
   * @param once 控制订阅回调只触发一次
   */
  depend(event: string, handle: Func, once?: boolean) {
    if (typeof handle !== 'function') {
      console.error('"handle" is not a function')
      return
    }

    let conversHandle: Func = handle
    if (once) {
      conversHandle = () => {
        handle()
        this.cancel(event)
      }
    }

    const handleList = this.#eventCenter[event]
    if (handleList) {
      handleList.push(conversHandle)
    } else {
      this.#eventCenter[event] = [conversHandle]
    }
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
   * @param event 事件
   * @param params 触发订阅回调时附加参数
   */
  notify(event: string, params?: unknown) {
    if (this.#eventCenter[event]) {
      const handleList = this.#eventCenter[event]
      for (let i = 0, { length } = handleList; i < length; i++) {
        handleList[i](params)
      }
    }
  }

  /**
   * 取消订阅特定事件，`whole`参数为`true`时取消全部订阅。
   *
   * @example
   * ...
   * dep.notify('open')
   * => func()
   *
   * dep.cancel('open')
   * dep.notify('open')
   *
   * @param event 事件
   * @param whole 控制取消全部订阅
   */
  cancel(event: string, whole?: boolean) {
    if (whole) {
      this.#eventCenter = {}
    } else if (this.#eventCenter[event]) {
      this.#eventCenter[event] = []
    }
  }
}

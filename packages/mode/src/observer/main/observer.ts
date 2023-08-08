import type { Func } from '@sdkset/types'

/**
 * `观察者（发布/订阅）`模式类。
 *
 * @example
 * const observer = new Observer()
 * observer.depend('open', () => log 1)
 * ...
 * dep.notify('open')
 * => log 1
 */
export class Observer {
  _events

  constructor() {
    this._events = new Map()
  }

  /**
   * 订阅特定事件，待特定事件发布时触发注册的回调，传递`isOnce`参数控制回调是否只执行一次。
   *
   * @example
   * const dep = new Observer()
   * dep.depend('open', func)
   * => dep { open: func }
   *
   * @param event 事件
   * @param handle 注册回调
   * @param isOnce 是否只触发一次
   */
  depend(event: string, handle: Func, isOnce?: boolean) {
    if (typeof handle !== 'function') {
      return console.error('"Handle" not a function, We need a function here')
    }

    let conversHandle = handle
    if (isOnce) {
      conversHandle = () => {
        handle()
        this.cancelNotify(event)
      }
    }

    const handleList = this._events.get(event)
    if (handleList) {
      handleList.push(conversHandle)
    } else {
      this._events.set(event, [conversHandle])
    }
  }

  /**
   * 发布特定事件，触发订阅的回调。
   *
   * @example
   * const dep = new Observer()
   * dep.depend('open', func)
   * dep.notify('open')
   * => func()
   *
   * @param event 事件
   * @param params 触发回调时附加参数
   */
  notify(event: string, params?: unknown) {
    if (this._events.has(event)) {
      const handleList = this._events.get(event)
      for (let i = 0, { length } = handleList; i < length; i++) {
        handleList[i](params)
      }
    }
  }

  /**
   * 取消订阅特定事件，传递`isWhole`参数控制是否全部取消。
   *
   * @example
   * ...
   * dep.notify('open')
   * => func()
   *
   * dep.cancelNotify('open')
   * dep.notify('open')
   *
   * @param event 事件
   * @param isWhole 是否全部取消
   */
  cancelNotify(event: string, isWhole?: boolean) {
    if (isWhole) {
      this._events = new Map()
    } else if (this._events.has(event)) {
      this._events.set(event, [])
    }
  }
}

import { Observer } from './observer'

/**
 * 返回一个[观察者（发布/订阅）模式](https://refactoringguru.cn/design-patterns/observer)包装器对象。
 *
 * @example
 * const observer = useObserver()
 * observer.depend('open', () => log 1)
 * ...
 * observer.notify('open')
 * => log 1
 *
 * @method
 * `observer.depend(event: string, handle: Func, isOnce?: boolean): void`
 *
 * 订阅特定事件，待特定事件发布时触发对应回调，传递`isOnce`参数控制回调是否只执行一次。
 *
 * `observer.notify(event: string, params?: unknown): void`
 *
 * 发布特定事件，触发订阅的回调。
 *
 * `observer.cancelNotify(event: string, isWhole?: boolean): void`
 *
 * 取消订阅特定事件，传递`isWhole`参数控制是否全部取消。
 */
export function useObserver() {
  return new Observer()
}

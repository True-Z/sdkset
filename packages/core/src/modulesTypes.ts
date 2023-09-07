import * as underscoreModules from './modules/__index'

import type { Dictionary, Func } from '@sdkset/types'

type Modules = typeof underscoreModules

type ChainHeadArgs<T> = {
  [K in keyof T]: T[K] extends (omit: never, ...args: infer P) => infer R ? (...args: P) => ChainCore<R> : T[K]
}

type OmitHeadArgs<T> = {
  [K in keyof T]: T[K] extends (omit: never, ...args: infer P) => infer R ? (...args: P) => R : T[K]
}

/** _ 调用类型 */
export interface ChainCore<V> extends ChainHeadArgs<Modules>, ChainHeadArgs<ArrayNativeMethod> {
  [key: string]: any
  /** 给定包装值 */
  _wrapped: V
  /** 是否为链式调用 */
  _chain?: boolean
  /** 返回被包装值 */
  value: () => V
  /** 返回被包装值 */
  valueOf: () => V
  /** 返回被包装值 */
  toJSON: () => V
  /** 返回被包装值的字符串原始值 */
  toString: () => string
  /** 混入自定义函数 */
  mixin: (object: Dictionary<Func>) => (value?: unknown) => OmitCore<V>
  /** Core 包装器 */
  _: (value?: unknown) => OmitCore<V>
  /** 开启链式调用 */
  chain: (value?: unknown) => ChainCore<V>
}

/** 链式调用类型 */
export interface OmitCore<V> extends OmitHeadArgs<Modules>, OmitHeadArgs<ArrayNativeMethod> {
  [key: string]: any
  /** 给定包装值 */
  _wrapped: V
  /** 是否为链式调用 */
  _chain?: boolean
  /** 返回被包装值 */
  value: () => V
  /** 返回被包装值 */
  valueOf: () => V
  /** 返回被包装值 */
  toJSON: () => V
  /** 返回被包装值的字符串原始值 */
  toString: () => string
  /** 混入自定义函数 */
  mixin: (object: Dictionary<Func>) => (value?: unknown) => OmitCore<V>
  /** Core 包装器 */
  _: (value?: unknown) => OmitCore<V>
  /** 开启链式调用 */
  chain: (value?: unknown) => ChainCore<V>
}

/** 原生 Array 方法 */
export interface ArrayNativeMethod {
  /** 原生`Array.prototype.push` */
  push: []['push']
  /** 原生`Array.prototype.unshift` */
  unshift: []['unshift']
  /** 原生`Array.prototype.pop` */
  pop: []['pop']
  /** 原生`Array.prototype.shift` */
  shift: []['shift']
  /** 原生`Array.prototype.splice` */
  splice: []['splice']
  /** 原生`Array.prototype.sort` */
  sort: []['sort']
  /** 原生`Array.prototype.reverse` */
  reverse: []['reverse']
  /** 原生`Array.prototype.concat` */
  concat: []['concat']
  /** 原生`Array.prototype.join` */
  join: []['join']
  /** 原生`Array.prototype.slice` */
  slice: []['slice']
}

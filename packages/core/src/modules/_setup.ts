const freeGlobalThis =
  typeof globalThis === 'object' && globalThis !== null && globalThis.Object === Object && globalThis
const freeGlobal = typeof global === 'object' && global.global === global && global
const freeSelf = typeof self === 'object' && self.self === self && self
const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports
const freeModule =
  freeExports &&
  typeof module === 'object' &&
  module !== null &&
  !(module as unknown as Record<string, unknown>).nodeType &&
  module
const moduleExports = freeModule && freeModule.exports === freeExports
const freeProcess = moduleExports && (freeGlobal as unknown as Record<string, unknown>).process

/**
 * 在浏览器中建立根对象`window`（`self`）`global`。
 * 在服务器上，或者在一些虚拟机中为`this`。我们使用`self`，而不是支持`WebWorker`的`window`。
 */
export const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')()

/** 用于更快的访问`Node.js`帮助程序 */
export const nodeTypes = (() => {
  try {
    const typesHelper = freeModule && freeModule.require && freeModule.require('util').types
    return typesHelper && freeProcess && freeProcess.binding && freeProcess.binding('util')
  } catch (e) {
    //
  }
})()

const Buffer = moduleExports ? root.Buffer : undefined
export const nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined

// 规范适配
export const supportsArrayBuffer = typeof ArrayBuffer !== 'undefined'
export const supportsDataView = typeof DataView !== 'undefined'

// 可以精确表示的最大整数
export const MAX_SAFE_INTEGER = 9007199254740991

// 缩短原生对象原型访问
export const ArrayProto = Array.prototype
export const ObjectProto = Object.prototype
export const SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null

// 缩短原生对象原型方法访问
export const { push, slice, concat } = ArrayProto
export const { toString, hasOwnProperty } = ObjectProto
export const { getPrototypeOf } = Object

// 希望使用的所有`ECMAScript 5+`本机函数实现
export const nativeIsArray = Array.isArray
export const nativeAssign = Object.assign
export const nativeKeys = Object.keys
export const nativeValues = Object.values
export const nativeEntries = Object.entries
export const nativeFromEntries = Object.fromEntries
export const nativeCreate = Object.create
export const nativeIsView = supportsArrayBuffer && ArrayBuffer.isView

// 创建内置函数的引用，因为内部实现覆盖了它们
export const nativeIsNaN = isNaN
export const nativeIsFinite = isFinite

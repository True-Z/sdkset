import type { TypedArray } from '@sdkset/types'

const { toString } = Object.prototype

export function isBoolean(value: unknown): value is boolean {
  return value === false || value === true || toString.call(value) === '[object Boolean]'
}

export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return toString.call(value) === '[object ArrayBuffer]'
}

export function isBlob(value: unknown): value is Blob {
  return toString.call(value) === '[object Blob]'
}

export function isDataView(value: unknown): value is DataView {
  return toString.call(value) === '[object DataView]'
}

export function isTypedArray(value: unknown): value is TypedArray {
  return ArrayBuffer.isView(value) && !isDataView(value)
}

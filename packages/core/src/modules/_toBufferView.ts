import { _getByteLength } from './_getByteLength'

/**
 * 用于`isEqual`的内部实现。
 *
 * @example
 * toBufferView(ArrayBufferView)
 * => BufferView
 *
 * @param bufferSource ArrayBuffer 对象
 */
export function _toBufferView(bufferSource: DataView) {
  return new Uint8Array(bufferSource.buffer || bufferSource, bufferSource.byteOffset || 0, _getByteLength(bufferSource))
}

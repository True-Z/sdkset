/** 超时存储数据 */
export interface StorageData {
  /** 需缓存的值 */
  value: unknown
  /** 超时时间 */
  expire: number | undefined
}

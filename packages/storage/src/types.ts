export interface CreateStorageOption {
  type?: 'local'
}

export interface StorageFormat {
  /** 需缓存的值 */
  value: unknown
  /** 超时时间 */
  expire: number
}

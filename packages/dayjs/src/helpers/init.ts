import type { DayjsConfig } from '../types'

/** `dayjs`包装器默认配置 */
const defaultConfig: Required<DayjsConfig> = {
  time: new Date(),
  change: 'dayjs',
  format: 'YYYY-MM-DD HH:mm:ss',
  useUTC: false
}

/**
 * 返回`dayjs`包装器配置，如有更新配置则使用新配置，无则默认，返回处理完成的配置。
 *
 * @example
 * defineConfig({});
 * => defaultConfig
 *
 * defineConfig({...});
 * => {...}
 *
 * @param updateConfig 包装器更新配置
 */

export function init<C extends DayjsConfig>(updateConfig?: C) {
  if (updateConfig == null) {
    return defaultConfig
  }
  const config = {} as Required<DayjsConfig>
  Object.keys(defaultConfig).forEach((key) => {
    config[key] = updateConfig[key] || defaultConfig[key]
  })
  return config
}

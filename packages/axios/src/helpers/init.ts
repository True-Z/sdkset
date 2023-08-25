import { defaultConfig } from './config'
import { CreateConfig } from '../types'

export function init<C extends CreateConfig>(updateConfig: C) {
  if (updateConfig == null) {
    return defaultConfig
  }

  const config = {} as Required<CreateConfig>
  Object.keys(defaultConfig).forEach((key) => {
    config[key] = updateConfig[key] || defaultConfig[key]
  })
  return config
}

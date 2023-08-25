import { CreateAxiosOption } from '../types'

const defaultOption: Required<CreateAxiosOption> = {
  config: {},
  interceptor: {}
}

export function init<C extends CreateAxiosOption>(customOption: C) {
  if (customOption == null) {
    return defaultOption
  }
  const config = {} as Required<CreateAxiosOption>
  Object.keys(defaultOption).forEach((key) => {
    config[key] = customOption[key] || defaultOption[key]
  })
  return config
}

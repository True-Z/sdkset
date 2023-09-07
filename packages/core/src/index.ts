import { chain } from './chain'
import { core } from './core'
import { mixin } from './mixin'
import * as underscoreModules from './modules/__index'

import type { Dictionary, Func } from '@sdkset/types'

export * from './modules/__index'
export * from './__indexChaining'
export * from './types'

mixin({ chain, core, mixin })
mixin(underscoreModules as Dictionary<Func>)

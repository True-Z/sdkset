import { describe, test } from 'vitest'

import * as sdk from '../src'

describe('socket', () => {
  test('useSocket', () => {
    sdk.useSocket(
      { url: 'ws://121.40.165.18:8800', params: { id: 1 } },
      {
        open: (event) => {
          console.log('🚀 ~~ path: socket.browser.test.ts ~ line: 11 : ', event)
        },
        message: (event) => {
          console.log('🚀 ~~ path: socket.browser.test.ts ~ line: 14 : ', event)
        },
        error: (event) => {
          console.log('🚀 ~~ path: socket.browser.test.ts ~ line: 17 : ', event)
        },
        close: (event) => {
          console.log('🚀 ~~ path: socket.browser.test.ts ~ line: 20 : ', event)
        },
        reconnect: (event) => {
          console.log('🚀 ~~ path: socket.browser.test.ts ~ line: 23 : ', event)
        },
        fail: () => {
          console.log('🚀 ~~ path: socket.browser.test.ts ~ line: 26 : ', '失败')
        }
      }
    )
  })
})
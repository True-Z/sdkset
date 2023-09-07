import { describe, test } from 'vitest'

import * as sdk from './index'

describe('useWebSocket', () => {
  test('basis', async () => {
    const ws = await sdk.useWebSocket('ws://124.222.224.186:8800', {
      params: { id: 10086 },
      heartbeat: true,
      autoReconnect: true,
      interceptor: {
        message: (ws, event) => {
          console.log('🚀 ~~ path: socket.browser.test.ts ~ line: 14 : ', ws, event)
        },
        error: (ws, event) => {
          console.log('🚀 ~~ path: socket.browser.test.ts ~ line: 17 : ', ws, event)
        },
        close: (ws, event) => {
          console.log('🚀 ~~ path: socket.browser.test.ts ~ line: 20 : ', ws, event)
        },
        fail: () => {
          console.log('🚀 ~~ path: socket.browser.test.ts ~ line: 26 : ', '失败')
        }
      }
    })

    ws.send('hello!')
    ws.close()
  })
})

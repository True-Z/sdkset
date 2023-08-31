import { describe, expect, test } from 'vitest'

import * as sdk from '../src'

describe('axios', () => {
  test('useAxios', async () => {
    const server = sdk.useAxios({})
    const params = { id: 7810 }
    const { config } = await server.get('https://editor.swagger.io/', params)
    expect(config.params).toStrictEqual(params)
  })
})

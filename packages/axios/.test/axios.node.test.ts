import { describe, expect, test } from 'vitest'
import axios from 'axios'

import * as sdk from '../src'

const server = sdk.useAxios(axios.create({}))
const queryData = { id: 7810 }
describe('axios', () => {
  test('useAxios', async () => {
    const { config } = await server.get('https://editor.swagger.io/', queryData)
    await expect(config.params).toStrictEqual(queryData)
  })
})

import axios from 'axios'
import { describe, expect, test } from 'vitest'

import * as sdk from './index'

const axiosInstance = axios.create()

describe('axios', () => {
  test('useAxios', async () => {
    const server = sdk.useAxios(axiosInstance)
    const params = { id: 7810 }
    const { config } = await server.get('https://editor.swagger.io/', params)
    expect(config.params).toStrictEqual(params)
  })
})

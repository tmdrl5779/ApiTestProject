import { parseCookie } from '@/utils'
import { FetchApiResponse } from 'api-types'
import { AxiosHeaders, AxiosResponse } from 'axios'
import { Dictionary } from 'common-types'

export function parseResponse(response: AxiosResponse): Promise<FetchApiResponse> {
  const { data, headers } = response
  const { responseTime, status, body } = data
  const _headers: Dictionary<any> = Object.entries(headers).reduce((acc, item) => {
    const [key, value] = item
    return { ...acc, [key]: value }
  }, {})
  const cookies = parseCookie()
  return new Promise(resolve => {
    resolve({
      responseTime,
      status,
      body,
      headers: _headers,
      cookies,
    })
  })
}

import { httpMethods } from './../data/constants'
import { parseCookie } from '@/utils'
import { FetchApiResponse } from 'api-types'
import { AxiosHeaders, AxiosResponse } from 'axios'
import { Dictionary } from 'common-types'
import { ServerResponse } from '../types'

export function parseResponse(response: ServerResponse): FetchApiResponse {
  const { responseTime, status, body, header, cookie, url, httpMethod } = response
  return {
    responseTime,
    status,
    body,
    headers: header,
    cookies: cookie,
    url,
    httpMethod,
  }
}

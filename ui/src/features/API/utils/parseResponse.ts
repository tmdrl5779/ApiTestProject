import { FetchApiResponse, FetchApiResponseError } from 'api-types'
import { ServerResponse } from '../types'

export function parseStatus(status: string): string[] {
  const [code, ...rest] = status.split(' ')
  return [code, rest.join(' ')]
}

export function isErrorCode(code: string): boolean {
  return Number(code.at(0)) >= 4 ? true : false
}

export function parseResponse(response: ServerResponse): FetchApiResponse {
  const { responseTime, status, body, header, cookie, url, httpMethod } = response
  // const [code, message] = parseStatus(status)

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

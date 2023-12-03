import { ResponseData } from 'api-types'

export function parseResponse(data: ResponseData): Promise<{
  headers: object
  body: object
}> {
  return new Promise(resolve => {
    resolve({
      headers: data?.headers,
      body: data?.data,
    })
  })
}

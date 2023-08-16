declare module 'api-types' {
  import { Dictionary } from 'common-types'
  export interface FetchApiRequest {
    time: {
      connectionTime: number
      readTime: number
      writeTime: number
    }
    count: number
    url: string
    httpMethod: string // get, post, put, delete, patch 중 하나
    param: Dictionary
    header: Dictionary
    body: Dictionary
  }

  export interface FetchApiResponse {
    responseTime: number
    body: Dictionary
    status: string
  }

  export interface IAPI {
    request: FetchApiRequest
    response: FetchApiResponse
  }
}

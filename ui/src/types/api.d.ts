declare module 'api-types' {
  import { Dictionary, PayloadItem } from 'common-types'
  export interface FetchApiRequest {
    time: {
      connectionTime: number
      readTime: number
      writeTime: number
    }
    count: number
    url: string
    httpMethod: string // get, post, put, delete, patch 중 하나
    param: PayloadItem[]
    header: PayloadItem[]
    body: PayloadItem[]
  }

  export type BodyForFetchAPI = Omit<FetchApiRequest, 'param' | 'header' | 'body'> & {
    param: Dictionary<string>
    header: Dictionary<string>
    body: Dictionary<string>
  }

  export interface FetchApiResponse {
    responseTime: number
    body: Dictionary<string>
    status: string
  }

  export interface IAPI {
    uuid: string
    request: FetchApiRequest
    response: FetchApiResponse
  }
}

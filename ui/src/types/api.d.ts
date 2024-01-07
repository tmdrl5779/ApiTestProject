declare module 'api-types' {
  import { Dictionary, PayloadItem, StringObject } from 'common-types'
  import { AxiosHeaders, AxiosResponseHeaders } from 'axios'

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
    body: string
  }

  export type BodyForFetchAPI = Omit<FetchApiRequest, 'param' | 'header' | 'body'> & {
    param: Dictionary<string>
    header: Dictionary<string>
    body: object
  }

  export interface FetchApiResponse {
    responseTime: number
    status: string
    body: Dictionary<any> | string
    headers: Dictionary<any>
    cookies: Dictionary<any>
    request?: {
      url: string
      httpMethod: string
    }
  }

  export interface FetchApiResponseError {
    name: string
    message: string
  }

  export interface IAPI {
    uuid: string
    request: FetchApiRequest
    response: FetchApiResponse | FetchApiResponseError | null
  }
}

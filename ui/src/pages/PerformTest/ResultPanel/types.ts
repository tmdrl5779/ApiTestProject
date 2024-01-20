import { FetchApiResponse, FetchApiResponseError } from 'api-types'

export interface APITestResponse {
  responseList: FetchApiResponse[]
  totalTime: number
  result: boolean
  userId: string
}

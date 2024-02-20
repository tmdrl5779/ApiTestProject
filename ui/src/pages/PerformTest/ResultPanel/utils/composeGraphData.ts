import { FetchApiResponse } from 'api-types'
import { APITestResponse } from '../types'

export interface GraphData {
  labels: string[]
  success: Array<[string, number]>
  fail: Array<[string, number]>
}

export const composeGraphData = (startTime: number, apiTestResponses: APITestResponse[]): GraphData => {
  // console.log(apiTestResponses)
  return {
    labels: apiTestResponses.map(testResponse => ((testResponse.timeStamp - startTime) / 1000).toFixed(2)),
    success: apiTestResponses
      .filter(testResponse => testResponse.result === true)
      .map(testResponse => [((testResponse.timeStamp - startTime) / 1000).toFixed(2), testResponse.totalTime]),
    fail: apiTestResponses
      .filter(testResponse => testResponse.result === false)
      .map(testResponse => [((testResponse.timeStamp - startTime) / 1000).toFixed(2), testResponse.totalTime]),
  }
}

import { FetchApiResponse } from 'api-types'
import { APITestResponse } from '../types'

export interface GraphData {
  labels: number[]
  success: Array<[number, number]>
  fail: Array<[number, number]>
  successDetail: APITestResponse[]
  failDetail: APITestResponse[]
}

const getTimeDiff = (endTime: number, startTime: number): number => Number(((endTime - startTime) / 1000).toFixed(2))

export const composeGraphData = (startTime: number, apiTestResponses: APITestResponse[]): GraphData => {
  // console.log(apiTestResponses)
  return {
    labels: apiTestResponses.map(testResponse => getTimeDiff(testResponse.timeStamp, startTime)),
    success: apiTestResponses
      .filter(testResponse => testResponse.result === true)
      .map(testResponse => [getTimeDiff(testResponse.timeStamp, startTime), testResponse.totalTime]),
    fail: apiTestResponses
      .filter(testResponse => testResponse.result === false)
      .map(testResponse => [getTimeDiff(testResponse.timeStamp, startTime), testResponse.totalTime]),
    successDetail: apiTestResponses.filter(testResponse => testResponse.result === true),
    failDetail: apiTestResponses.filter(testResponse => testResponse.result === false),
  }
}

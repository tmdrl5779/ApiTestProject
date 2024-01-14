import { APITestResponse } from '../types'

export interface GraphData {
  labels: string[]
  success: number[]
  fail: number[]
}

export const composeGraphData = (startTime: number, apiTestResponses: APITestResponse[]): GraphData => {
  return {
    labels: apiTestResponses.map(testResponse => (testResponse.totalTime - startTime).toFixed(0)),
    success: apiTestResponses.map(
      testResponse => testResponse.responseList.filter(response => response.status.includes('200')).length
    ),
    fail: apiTestResponses.map(
      testResponse => testResponse.responseList.filter(response => !response.status.includes('200')).length
    ),
  }
}

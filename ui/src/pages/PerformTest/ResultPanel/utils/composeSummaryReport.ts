import { APITestResponse } from '../types'

export type ApiPerformance = {
  total: number
  avgResponseTime: number
  minResponseTime: number
  maxResponseTime: number
  failRate: number
}

export type ISummaryReport = {
  [label: string]: ApiPerformance
  total: ApiPerformance
}

const getDefaultApiPerformance = (): ApiPerformance => ({
  total: 0,
  avgResponseTime: 0,
  minResponseTime: 99999999,
  maxResponseTime: 0,
  failRate: 0,
})

export const composeSummaryReport = (apiTestResponses: APITestResponse[]): ISummaryReport => {
  const result: ISummaryReport = { total: getDefaultApiPerformance() }
  apiTestResponses
    .flatMap(testResponse => testResponse.responseList)
    .forEach(response => {
      const { httpMethod, url, responseTime, status } = response
      const label = [httpMethod, url].join(' ')
      if (!(label in result)) {
        result[label] = getDefaultApiPerformance()
      }
      result[label].total += 1
      result[label].avgResponseTime += responseTime
      result[label].minResponseTime = Math.min(result[label].minResponseTime, responseTime)
      result[label].maxResponseTime = Math.max(result[label].maxResponseTime, responseTime)
      if (!status.startsWith('200')) {
        result[label].failRate += 1
      }
    })
  // 1) total에 정보 쌓기
  // 2) 각 url 당 정보 후처리
  // 3) total 정보 후처리
  // avgResponseTime에 sum을 쌓다가, 다 끝나고 total로 나누어준다.
  // failRate에 fail을 쌓다가, 다 끝나고 total로 나누어준다.
  Object.getOwnPropertyNames(result).forEach(label => {
    if (label === 'total') {
      return
    }
    // 1)
    result.total.total += result[label].total
    result.total.avgResponseTime += result[label].avgResponseTime
    result.total.maxResponseTime = Math.max(result.total.maxResponseTime, result[label].maxResponseTime)
    result.total.minResponseTime = Math.min(result.total.minResponseTime, result[label].minResponseTime)
    result.total.failRate += result[label].failRate
    // 2)
    result[label].avgResponseTime = result[label].avgResponseTime / result[label].total
    result[label].failRate = (result[label].failRate / result[label].total) * 100
  })

  // 3)
  result.total.avgResponseTime = result.total.avgResponseTime / result.total.total
  result.total.failRate = (result.total.failRate / result.total.total) * 100

  return result
}

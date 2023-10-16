import { genearteUUID } from './../utils/generateUUID'
import { FetchApiRequest, FetchApiResponse, IAPI } from 'api-types'

export const defaultFetchApiTime = {
  connectionTime: 0,
  readTime: 0,
  writeTime: 0,
}

export const defaultFetchApiCount = 0

export const getDefaultFetchApiRequest = (): FetchApiRequest => ({
  time: defaultFetchApiTime,
  count: defaultFetchApiCount,
  url: '',
  httpMethod: 'GET',
  param: {},
  header: {},
  body: {},
})

export const getDefaultFetchApiResponse = (): FetchApiResponse => ({
  responseTime: 0,
  body: {},
  status: '',
})

export const getDefaultAPI = (): IAPI => ({
  uuid: genearteUUID(),
  request: getDefaultFetchApiRequest(),
  response: getDefaultFetchApiResponse(),
})

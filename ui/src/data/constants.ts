import { genearteUUID } from './../utils/generateUUID'
import { FetchApiRequest, FetchApiResponse, IAPI } from 'api-types'
import { PayloadItem } from 'common-types'

export const defaultFetchApiTime = {
  connectionTime: 10,
  readTime: 10,
  writeTime: 10,
}

export const defaultFetchApiCount = 1

export const getDefaultFetchApiRequest = (): FetchApiRequest => ({
  time: defaultFetchApiTime,
  count: defaultFetchApiCount,
  url: '',
  httpMethod: 'GET',
  param: [getDefaultPayloadItem()],
  header: [getDefaultPayloadItem()],
  body: '{}',
})

export const getDefaultFetchApiResponse = (): FetchApiResponse => ({
  responseTime: 0,
  status: '200',
  body: {},
  headers: {},
  cookies: {},
  url: '',
  httpMethod: 'GET',
})

export const getDefaultAPI = (): IAPI => ({
  uuid: genearteUUID(),
  request: getDefaultFetchApiRequest(),
  response: null,
})

export const getDefaultPayloadItem = (): PayloadItem => ({
  included: true,
  key: '',
  value: '',
  description: '',
})

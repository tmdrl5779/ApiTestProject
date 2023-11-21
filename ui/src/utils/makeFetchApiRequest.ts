import { Dictionary, PayloadItem } from 'common-types'
import { FetchApiRequest } from 'api-types'
import { defaultFetchApiCount, defaultFetchApiTime } from '@/data/constants'
export const makeFetchApiRequest = (
  url: string,
  httpMethod: string,
  param: PayloadItem[],
  header: PayloadItem[],
  body: PayloadItem[]
): FetchApiRequest => {
  return {
    time: defaultFetchApiTime,
    count: defaultFetchApiCount,
    url,
    httpMethod,
    param,
    header,
    body,
  }
}

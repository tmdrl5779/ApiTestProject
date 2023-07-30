import { Dictionary } from 'common-types'
import { FetchApiRequest } from 'api-types'
import { defaultFetchApiCount, defaultFetchApiTime } from '@/data/constants'
export const makeFetchApiRequest = (
  url: string,
  httpMethod: string,
  param: Dictionary,
  header: Dictionary,
  body: Dictionary
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

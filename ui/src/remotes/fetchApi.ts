import { BodyForFetchAPI, FetchApiRequest, FetchApiResponse } from 'api-types'
import axios from 'axios'

export const fetchApi = (request: BodyForFetchAPI): Promise<FetchApiResponse> => {
  return axios.post(process.env.REACT_APP_ADAPTOR_BASE_URL + '/call/api', request)
}

import { FetchApiRequest, FetchApiResponse } from 'api-types'
import axios from 'axios'

export const fetchApi = (request?: FetchApiRequest): Promise<FetchApiResponse> => {
  return axios.post(process.env.REACT_APP_ADAPTOR_BASE_URL + '/call/api', request)
}

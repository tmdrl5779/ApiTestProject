import { BodyForFetchAPI, FetchApiRequest, FetchApiResponse } from 'api-types'
import axios, { AxiosResponse } from 'axios'

export const fetchApi = (request: BodyForFetchAPI): Promise<AxiosResponse> => {
  return axios.post(process.env.REACT_APP_ADAPTOR_BASE_URL + '/api/call', request)
}

import { parseResponse, ServerResponse } from '@/features/API'
import { APITestResponse } from '../types'

export const parseTestResponse = (
  testResponse: Omit<APITestResponse, 'responseList'> & { responseList: ServerResponse[] }
): APITestResponse => {
  return {
    ...testResponse,
    responseList: testResponse.responseList.map(parseResponse),
  }
}

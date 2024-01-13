import { FetchApiRequest } from 'api-types'

export const validateApiRequest = (request: FetchApiRequest) => {
  if (request.url.trim() === '') {
    return false
  }
  return true
}

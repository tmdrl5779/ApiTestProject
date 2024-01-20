import { FetchApiRequest } from 'api-types'

export const validateApiRequest = (request: FetchApiRequest): { canSend: boolean; message: string } => {
  if (request.url.trim() === '') {
    return {
      canSend: false,
      message: 'Request URL을 입력해주세요.',
    }
  }
  if (Math.min(...Object.values(request.time)) < 1) {
    return {
      canSend: false,
      message: 'Request의 Time탭의 각 Timeout을 최소 1이상의 값으로 설정해주세요.',
    }
  }
  return {
    canSend: true,
    message: '',
  }
}

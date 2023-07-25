import { ReqData } from './../types'

export const getQueryString = (queryArr: ReqData[]): string => {
  return (
    '?' +
    queryArr
      .map(query => {
        return `${query.key}=${query.value}`
      })
      .join('&')
  )
}

import { BodyForFetchAPI, FetchApiRequest } from 'api-types'
import { Dictionary, PayloadItem } from 'common-types'

function convertItemArrToObj(items: PayloadItem[]): Dictionary<string> {
  const includedItems = items.filter(item => item.included && !(item.key.trim() === ''))
  const result: Dictionary<string> = {}
  includedItems.forEach(item => {
    result[item.key] = item.value
  })
  return result
}

export const convertReqToBodyForFetch = (req: FetchApiRequest): BodyForFetchAPI => {
  const { param, header, body, ...rest } = req

  return {
    ...req,
    param: convertItemArrToObj(param),
    body: convertItemArrToObj(body),
    header: convertItemArrToObj(header),
  }
}

import { Dictionary } from 'common-types'
import { ReqData } from '../types'

export const convertDatasToObj = (datas: ReqData[]): Dictionary => {
  return datas.reduce((acc: any, cur) => {
    const added = Object.create(null)
    added[cur.key] = cur.value
    return Object.assign(acc, added)
  }, Object.create(null))
}

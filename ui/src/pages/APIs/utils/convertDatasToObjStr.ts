import { ReqData } from '../types'

export const convertDatasToObjStr = (datas: ReqData[]): string => {
  return JSON.stringify(
    datas.reduce((acc: any, cur) => {
      const added = Object.create(null)
      added[cur.key] = cur.value
      return Object.assign(acc, added)
    }, Object.create(null))
  )
}

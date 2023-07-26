import { ReqData } from '../types'
import { convertDatasToObjStr } from './convertDatasToObjStr'

export const getHeaderObj = (datas: ReqData[]): HeadersInit => {
  return JSON.parse(convertDatasToObjStr(datas))
}

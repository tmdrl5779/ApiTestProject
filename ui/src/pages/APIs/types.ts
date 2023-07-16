import { httpMethods } from "./constants"

export interface TabItem {
  tabTitle: string
  mainTitle: string | null
}

export interface ReqData {
  key: string
  value: string
  description: string
}

export type DataNames = 'Params' | 'Headers' | 'Body'

export type Datas = Record<DataNames, Array<ReqData>>

export type HttpMethods = typeof httpMethods[number]

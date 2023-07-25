import { httpMethods } from './data/constants'

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

export type Datas = Record<DataNames, ReqData[]>

export type HttpMethods = (typeof httpMethods)[number]

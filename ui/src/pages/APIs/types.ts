import { StringObject } from 'common-types'
import { httpMethods } from './data/constants'

export interface TabItem {
  tabTitle: string
  mainTitle: string | null
}

export interface ReqData {
  key: string
  value: string
  description: string
  included: boolean
  uuid: string
}

export type DataNames = 'Params' | 'Headers' | 'Body'

export type ReqPayload = {
  [P in Exclude<DataNames, 'Headers'>]: string
} & { Headers: any }

export type Datas = Record<DataNames, ReqData[]>

export type HttpMethods = (typeof httpMethods)[number]

export interface DataForResponseViewer {
  body: StringObject
  headers: StringObject
  cookies: StringObject
}

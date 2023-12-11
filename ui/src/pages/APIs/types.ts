import { Dictionary, StringObject } from 'common-types'
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

// TODO: ㄴㄴ responseviewer 로직 넘 복잡하니 간단하게 바꾸자
export interface DataForResponseViewer {
  body: StringObject | string
  headers: Dictionary<string>
  cookies: Dictionary<string>
}

// useAPIList 관련 타입들

// TODO: ResponseAction type 추가하기
export type UpdateApiAction = UpdatePayloadAction | UpdateTimeAction | UpdateMetaAction

export type UpdateApiType = 'time' | 'payload' | 'meta' | 'response'

//

export type TimePropertyNames = 'connectionTime' | 'readTime' | 'writeTime'

export interface UpdateTimeAction {
  key: TimePropertyNames
  value: number
  _tag: 'UpdateTimeAction'
}

export const isUpdateTimeAction = (target: UpdateApiAction): target is UpdateTimeAction => {
  return target?._tag === 'UpdateTimeAction'
}

//

export type Metakeys = 'url' | 'httpMethod' | 'count'

export interface UpdateMetaAction {
  key: Metakeys
  value: string | number
  _tag: 'UpdateMetaAction'
}

export const isUpdateMetaAction = (target: UpdateApiAction): target is UpdateMetaAction => {
  return target?._tag === 'UpdateMetaAction'
}

//

export type PayloadType = 'param' | 'header' | 'body'
export type PayloadKeys = 'included' | 'key' | 'value' | 'description'

export interface UpdatePayloadAction {
  type: PayloadType
  idx: number
  key: PayloadKeys
  value: string
  _tag: 'UpdatePayloadAction'
}

export const isUpdatePayloadAction = (target: UpdateApiAction): target is UpdatePayloadAction => {
  return target?._tag === 'UpdatePayloadAction'
}

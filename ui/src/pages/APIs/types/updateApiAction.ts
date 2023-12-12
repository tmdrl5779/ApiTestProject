import { FetchApiResponse } from 'api-types'

export type UpdateApiAction = UpdatePayloadAction | UpdateTimeAction | UpdateMetaAction | UpdateResponseAction

export type UpdateApiType = 'time' | 'payload' | 'meta' | 'response'

export type TimePropertyNames = 'connectionTime' | 'readTime' | 'writeTime'

export interface UpdateTimeAction {
  key: TimePropertyNames
  value: number
  _tag: 'UpdateTimeAction'
}

export const isUpdateTimeAction = (target: UpdateApiAction): target is UpdateTimeAction => {
  return target?._tag === 'UpdateTimeAction'
}

export type Metakeys = 'url' | 'httpMethod' | 'count'

export interface UpdateMetaAction {
  key: Metakeys
  value: string | number
  _tag: 'UpdateMetaAction'
}

export const isUpdateMetaAction = (target: UpdateApiAction): target is UpdateMetaAction => {
  return target?._tag === 'UpdateMetaAction'
}

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

export interface UpdateResponseAction {
  response: FetchApiResponse
  _tag: 'UpdateResponseAction'
}

export const isUpdateResponseAction = (target: UpdateResponseAction): target is UpdateResponseAction => {
  return target?._tag === 'UpdateResponseAction'
}

import { DataNames, Datas, ReqData } from './../types'
import { produce } from 'immer'
import { getDefaultData, getDefaultDatas } from './constants'

export interface ReqDataAction {
  type: 'ADD' | 'DELETE' | 'INPUT_CHANGE' | 'CHANGE'
  dataName: DataNames
  idx?: number
  key?: keyof ReqData
  value?: string | boolean
}

export const initialReqDatas: Datas = {
  Params: getDefaultDatas(),
  Headers: getDefaultDatas(),
  Body: getDefaultDatas(),
}

function isActionAboutChange(action: ReqDataAction): action is Required<ReqDataAction> {
  if (typeof action.idx === 'number' && action.key !== undefined && action.value !== undefined) {
    return true
  }
  return false
}

export const reqDataReducer = (state = initialReqDatas, action: ReqDataAction) =>
  produce(state, draft => {
    switch (action.type) {
      case 'ADD':
        draft[action.dataName].push(getDefaultData())
        break
      case 'DELETE':
        if (typeof action.idx === 'number') {
          draft[action.dataName].splice(action.idx, 1)
        }
        break
      case 'INPUT_CHANGE':
        if (isActionAboutChange(action)) {
          // TODO: 관련해서 typing 정리하고 블로그에 포스팅
          draft[action.dataName][action.idx][action.key] = action.value as never
          if (action.idx === draft[action.dataName].length - 1 && action.key === 'key' && action.value !== '') {
            draft[action.dataName].push(getDefaultData())
            draft[action.dataName][action.idx]['included'] = true
          }
        }
        break
      case 'CHANGE':
        if (isActionAboutChange(action)) {
          draft[action.dataName][action.idx][action.key] = action.value as never
        }
        break
      default:
        break
    }
  })

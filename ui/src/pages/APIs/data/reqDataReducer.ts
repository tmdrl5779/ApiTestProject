import { DataNames, Datas, ReqData } from './../types'
import { produce } from 'immer'
import { getDefaultData, getDefaultDatas } from './constants'

export interface ReqDataAction {
  type: 'ADD' | 'DELETE' | 'INPUT_CHANGE' | 'CHANGE'
  dataName: DataNames
  idx?: number
  key?: keyof ReqData
  value?: string
}

export const initialReqDatas: Datas = {
  Params: getDefaultDatas(),
  Headers: getDefaultDatas(),
  Body: getDefaultDatas(),
}

function isActionAboutChange(action: ReqDataAction): action is Required<ReqDataAction> {
  if (typeof action.idx === 'number' && action.key !== undefined && typeof action.value === 'string') {
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
          draft[action.dataName][action.idx][action.key] = action.value
          if (action.idx === draft[action.dataName].length - 1 && action.key === 'key' && action.value !== '') {
            draft[action.dataName].push(getDefaultData())
          }
        }
        break
      case 'CHANGE':
        if (isActionAboutChange(action)) {
          draft[action.dataName][action.idx][action.key] = action.value
        }
        break
      default:
        break
    }
  })

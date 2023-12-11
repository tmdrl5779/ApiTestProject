import { isUpdateTimeAction, isUpdateMetaAction, isUpdatePayloadAction } from './../types'
import { getDefaultAPI, getDefaultPayloadItem } from '../../../data/constants'
import { APIListState } from '@/data/store'
import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { IAPI } from 'api-types'
import { produce, Draft } from 'immer'
import { PayloadKeys, PayloadType, UpdateApiAction } from '../types'

export interface UseAPIReturns {
  APIList: IAPI[]
  createAPI: () => void
  deleteAPI: (idx: number) => void
  updateAPI: (idx: number) => (action: UpdateApiAction) => void
}

export const useAPIList = (): UseAPIReturns => {
  const [APIList, setAPIList] = useRecoilState(APIListState)

  const _setAPIList = useCallback(
    (recipe: (draft: Draft<IAPI[]>) => void): void => {
      setAPIList(prev => produce(prev, recipe))
    },
    [setAPIList]
  )

  const createAPI = useCallback(() => {
    setAPIList(prev => [...prev, getDefaultAPI()])
  }, [setAPIList])

  const deleteAPI = useCallback(
    (idx: number) => {
      setAPIList(prev => prev.filter((_, _idx) => idx !== _idx))
    },
    [setAPIList]
  )

  const updateAPI = useCallback(
    (idx: number) => (action: UpdateApiAction) => {
      if (isUpdateTimeAction(action)) {
        const { key, value } = action
        _setAPIList(draft => {
          draft[idx]['request']['time'][key] = value
        })
      } else if (isUpdateMetaAction(action)) {
        const { key, value } = action
        _setAPIList(draft => {
          if (key === 'count' && typeof value === 'number') {
            draft[idx]['request'][key] = value
          } else if ((key === 'httpMethod' || key === 'url') && typeof value === 'string') {
            draft[idx]['request'][key] = value
          }
        })
      } else if (isUpdatePayloadAction(action)) {
        const { type, idx: payloadIdx, key, value } = action
        if (key === 'included') {
          _setAPIList(draft => {
            draft[idx]['request'][type][payloadIdx]['included'] = !draft[idx]['request'][type][idx]['included']
          })
        } else {
          _setAPIList(draft => {
            draft[idx]['request'][type][payloadIdx][key] = value
            if (draft[idx]['request'][type][payloadIdx + 1] === undefined) {
              draft[idx]['request'][type].push(getDefaultPayloadItem())
            }
          })
        }
      }
    },
    [_setAPIList]
  )

  return {
    APIList,
    createAPI,
    deleteAPI,
    updateAPI,
  }
}

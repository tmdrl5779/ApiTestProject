import { getDefaultAPI } from '../../../data/constants'
import { APIListState } from '@/data/store'
import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { IAPI } from 'api-types'
import { produce } from 'immer'

export interface UseAPIReturns {
  APIList: IAPI[]
  createAPI: () => void
  deleteAPI: (idx: number) => void
  updateAPI: (idx: number) => (type: UpdateType, key: string, value: any) => void
}

type UpdateType = 'time' | 'payload' | 'meta' | 'response'

export const useAPIList = (): UseAPIReturns => {
  const [APIList, setAPIList] = useRecoilState(APIListState)

  const createAPI = useCallback(() => {
    setAPIList(prev => [...prev, getDefaultAPI()])
  }, [setAPIList])

  const deleteAPI = useCallback(
    (idx: number) => {
      setAPIList(prev => prev.filter((_, _idx) => idx !== _idx))
    },
    [setAPIList]
  )

  // const updateAPI = useCallback(
  //   (idx: number) => (value: IAPI) => {
  //     setAPIList(prev => [...prev.slice(0, idx), value, ...prev.slice(idx + 1)])
  //   },
  //   [setAPIList]
  // )

  const updateAPI = useCallback(
    (idx: number) => (type: UpdateType, key: string, value: any) => {
      if (type === 'time') {
        if (key === 'connectionTime' || key === 'readTime' || key === 'writeTime') {
          setAPIList(prev =>
            produce(prev, draft => {
              draft[idx]['request']['time'][key] = value
            })
          )
        }
      } else if (type === 'payload') {
        if (key === 'param' || key === 'header' || key === 'body') {
          // TODO: Params handle 로직 추가
          // if (key === 'add') {
          // }
        }
      } else if (type === 'meta') {
        setAPIList(prev =>
          produce(prev, draft => {
            if ((key === 'url' || key === 'httpMethod') && typeof value === 'string') {
              draft[idx]['request'][key] = value
            } else if (key === 'count' && typeof value === 'number') {
              draft[idx]['request'][key] = value
            }
          })
        )
      }
    },
    [setAPIList]
  )

  return {
    APIList,
    createAPI,
    deleteAPI,
    updateAPI,
  }
}

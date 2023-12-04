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
  updateAPI: (idx: number) => (value: IAPI) => void
}

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

  const updateAPI = useCallback(
    (idx: number) => (value: IAPI) => {
      setAPIList(prev => [...prev.slice(0, idx), value, ...prev.slice(idx + 1)])
    },
    []
  )

  return {
    APIList,
    createAPI,
    deleteAPI,
    updateAPI,
  }
}

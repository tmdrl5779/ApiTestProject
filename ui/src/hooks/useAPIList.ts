import { APIListState } from '@/data/store'
import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

export const useAPIList = () => {
  const [APIList, setAPIList] = useRecoilState(APIListState)

  const createAPI = useCallback(() => {}, [])

  const deleteAPI = useCallback((idx: number) => {}, [])

  const updateAPI = useCallback((idx: number) => {}, [])
}

import { UseAPIReturns } from '@/hooks'
import { IAPI } from 'api-types'
import { FC, useMemo } from 'react'
import { APIActionsContext, APIValuesContext } from '../APIContext'
import { APIContoller } from './APIController'
import { APIPayloadEditor } from './APIPayloadEditor'

export interface APIRequestEditorProps {
  api: IAPI
  idx: number
  updateAPI: UseAPIReturns['updateAPI']
  hasFetchFunc?: boolean
}

export const APIRequestEditor: FC<APIRequestEditorProps> = ({ api, idx, updateAPI, hasFetchFunc = true }) => {
  const updateSingleAPI = useMemo(() => updateAPI(idx), [idx, updateAPI])
  return (
    <APIValuesContext.Provider value={{ api }}>
      <APIActionsContext.Provider value={{ updateSingleAPI }}>
        <APIContoller hasFetchFunc={hasFetchFunc} />
        <APIPayloadEditor />
      </APIActionsContext.Provider>
    </APIValuesContext.Provider>
  )
}

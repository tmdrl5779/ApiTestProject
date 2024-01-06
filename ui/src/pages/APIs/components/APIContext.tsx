import { UseAPIReturns } from '@/hooks'
import { createContext, useContext } from '@/utils/RobustContext'
import { IAPI } from 'api-types'

interface IAPIValuesContext {
  api: IAPI
}

interface IAPIActionsContext {
  updateSingleAPI: ReturnType<UseAPIReturns['updateAPI']>
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
}

export const APIValuesContext = createContext<IAPIValuesContext>()
APIValuesContext.displayName = 'APIValuesContext'
export const APIActionsContext = createContext<IAPIActionsContext>()
APIActionsContext.displayName = 'APIActionsContext'

export const useAPIContext = (): IAPIValuesContext & IAPIActionsContext => {
  const { api } = useContext(APIValuesContext)
  const { updateSingleAPI, setIsFetching } = useContext(APIActionsContext)
  return { api, updateSingleAPI, setIsFetching }
}

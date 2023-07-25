import { Datas, HttpMethods, ReqData } from './types'
import { createContext } from '@/utils/RobustContext'
import { httpMethods } from './data/constants'
import { ReqDataAction } from './data/reqDataReducer'

interface IAPIsContext {
  method: HttpMethods
  url: string
  datas: Datas
  dispatchForDatas: React.Dispatch<ReqDataAction>
}

export const APIsContext = createContext<IAPIsContext>()
APIsContext.displayName = 'APIsContext'

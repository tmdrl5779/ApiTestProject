import { Datas, HttpMethods, ReqData } from '../../types'
import { createContext } from '@/utils/RobustContext'
import { ReqDataAction } from './reqDataReducer'

interface IReqDataEditorContext {
  method: HttpMethods
  url: string
  datas: Datas
  dispatchForDatas: React.Dispatch<ReqDataAction>
}

export const ReqDataEditorContext = createContext<IReqDataEditorContext>()
ReqDataEditorContext.displayName = 'ReqDataEditorContext'

import { Datas, HttpMethods, ReqData } from './types';
import { createContext } from '@/utils/RobustContext'
import { httpMethods } from './constants';

interface IAPIsContext {
  method: HttpMethods
  url: string
  datas: Datas
  setDatas: React.Dispatch<React.SetStateAction<Datas>>
}

export const APIsContext = createContext<IAPIsContext>()
APIsContext.displayName = 'APIsContext'

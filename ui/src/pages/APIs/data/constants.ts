import { ReqData } from './../types'
import { TabItem } from '../types'
import { genearteUUID } from '@/utils'

export const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const

export const dataColumns = ['', 'KEY', 'VALUE', 'DESCRIPTION'] as const

export const getDefaultData = (): ReqData => ({
  key: '',
  value: '',
  description: '',
  included: false,
  uuid: genearteUUID(),
})
export const getDefaultDatas = (): ReqData[] => [getDefaultData()]

export const tabItems: TabItem[] = [
  { tabTitle: 'Params', mainTitle: 'Query Params' },
  { tabTitle: 'Headers', mainTitle: 'Headers' },
  { tabTitle: 'Body', mainTitle: null },
]

import { ReqData } from './../types'
import { TabItem } from '../types'
import { genearteUUID } from '@/utils'
import { TabsItem } from '@/components'

export const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export const dataColumns = ['', 'KEY', 'VALUE', 'DESCRIPTION'] as const

export const getDefaultData = (): ReqData => ({
  key: '',
  value: '',
  description: '',
  included: false,
  uuid: genearteUUID(),
})
export const getDefaultDatas = (): ReqData[] => [getDefaultData()]

import { TabItem } from "./types"

export const httpMethods = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE'
] as const

export const dataColumns = ['', 'KEY', 'VALUE', 'DESCRIPTION'] as const

export const getDefaultData = () => ({ key: '', value: '', description: '' })
export const getDefaultDatas = () => ([{ key: '', value: '', description: '' }])

export const tabItems: TabItem[] = [
  { tabTitle: 'Params', mainTitle: 'Query Params' },
  { tabTitle: 'Headers', mainTitle: 'Headers' },
  { tabTitle: 'Body', mainTitle: null },
]
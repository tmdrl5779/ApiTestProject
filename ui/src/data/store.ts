import { getDefaultAPI } from './constants'
import { IAPI } from 'api-types'
import { atom } from 'recoil'

export const APIListState = atom<IAPI[]>({
  key: 'apiList',
  default: [getDefaultAPI()],
})

const defaultAPIForTest = getDefaultAPI()
defaultAPIForTest.request.url = 'https://jsonplaceholder.typicode.com/todos/1'

export const APIListForTestState = atom<IAPI[]>({
  key: 'apiListForTest',
  default: [defaultAPIForTest],
})

export interface TestMetaData {
  userCount: number
  repeatCount: number
  interval: number
  isConcur: boolean
}

const defaultTestMetaData: TestMetaData = {
  userCount: 10,
  repeatCount: 1,
  interval: 0,
  isConcur: true,
}

export const MetaDataForTestState = atom<TestMetaData>({
  key: 'metaDataForTest',
  default: defaultTestMetaData,
})

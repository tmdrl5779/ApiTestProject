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

import { getDefaultAPI } from './constants'
import { IAPI } from 'api-types'
import { atom, AtomEffect } from 'recoil'

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  key =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue))
    })
  }

export const APIListState = atom<IAPI[]>({
  key: 'apiList',
  default: [getDefaultAPI()],
  effects: [localStorageEffect<IAPI[]>('apiList')]
})

const defaultAPIForTest = getDefaultAPI()
defaultAPIForTest.request.url = 'https://jsonplaceholder.typicode.com/todos/1'

export const APIListForTestState = atom<IAPI[]>({
  key: 'apiListForTest',
  default: [defaultAPIForTest],
  effects: [localStorageEffect<IAPI[]>('apiListForTest')]
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
  effects: [localStorageEffect<TestMetaData>('metaDataForTest')]
})

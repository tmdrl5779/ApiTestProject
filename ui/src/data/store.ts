import { getDefaultAPI } from './constants'
import { IAPI } from 'api-types'
import { atom } from 'recoil'

export const APIListState = atom<IAPI[]>({
  key: 'apiList',
  default: [getDefaultAPI()],
})

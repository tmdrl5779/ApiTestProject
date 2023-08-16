import { APIListState } from '@/data/store'
import { useRecoilState } from 'recoil'

export const useAPIList = () => {
  const [APIList, setAPIList] = useRecoilState(APIListState)
}

import { ReactNode } from 'react'

type ReactChildren = Exclude<ReactNode, boolean | null | undefined>

export function isItemTabsItem(item: ReactChildren): boolean {
  // TS에선 ?. 가 잘 안먹는다
  if (typeof item === 'string' || typeof item === 'number') {
    return false
  }
  if (!('type' in item) || !('props' in item)) {
    return false
  }
  if (typeof item.type === 'string') {
    return false
  }
  if (item?.type?.name === 'TabsItem') {
    return true
  }
  return false
}

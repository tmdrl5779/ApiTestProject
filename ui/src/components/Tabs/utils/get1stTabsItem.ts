import { Children, ReactNode } from 'react'
import { isItemTabsItem } from './isItemTabsItem'

export function get1stTabsItem(children: ReactNode): string | null {
  for (const item of Children.toArray(children)) {
    if (isItemTabsItem(item)) {
      // ?. 쓰기 꼼수
      return (item as { props: any })?.props?.value
    }
  }
  return null
}

import { Children, ReactNode } from 'react'
import { isItemTabsItem } from './isItemTabsItem'

export function validateTabsItems(children: ReactNode): void {
  for (const item of Children.toArray(children)) {
    if (!isItemTabsItem(item)) {
      console.warn('<Tabs/> 안에 <TabsItem/> 이 아닌 다른 컴포넌트나 태그가 들어 있어요.', 'item:', item)
    }
  }
}

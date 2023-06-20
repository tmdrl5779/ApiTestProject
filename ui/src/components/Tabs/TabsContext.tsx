import { createContext } from 'react'

interface ITabsContext {
  selectedTab: string
  onTabSelect: (value: string) => void
}

export const TabsContext = createContext({} as ITabsContext)
TabsContext.displayName = 'TabsContext'

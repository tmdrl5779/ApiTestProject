import { createContext } from '@/utils/RobustContext'

interface ITabsContext {
  selectedTab: string | null
  onTabSelect: (value: string) => void
}

export const TabsContext = createContext<ITabsContext>()
TabsContext.displayName = 'TabsContext'

interface TabsProps {
  type?: 'card' | 'line'
  position?: 'vertical' | 'horizontal'
  style?: React.CSSProperties
  onTabClick?: (key: string) => void
  children: React.ReactNode
}

interface TabsComposition {
  Item: typeof TabsItem
}

interface TabsItemProps {
  key: string
  children: React.ReactNode
}

// TODO: 접근성 고려하기 aria-selected , role 등등

const Tabs: React.FC<TabsProps> & TabsComposition = ({ type = 'line', position = 'horizontal', style, children }) => {
  return <p>Tabs</p>
}

const TabsItem: React.FC<TabsItemProps> = ({ key, children }) => {
  return <p>TabItem</p>
}

Tabs.Item = TabsItem

export { Tabs }

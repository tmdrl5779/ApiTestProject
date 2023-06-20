import { m } from 'framer-motion'
import { useCallback, useContext, useMemo, useState } from 'react'
import { TabsContext } from './TabsContext'

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
  value: string
  children: React.ReactNode
}

// TODO
// 1. context 최적화 -> 따로 공통 훅 useRobustContext, createRobustContext(generic활용) 등으로 꺼내 쓰면 좋을 듯
// 2. selectedTab default값으로 children에서 1번째 값 추출해서 쓰자
// 3. css + motion 입히기
// 4. 상태 처리 로직들도 따로 커스텀훅으로 빼자

const Tabs: React.FC<TabsProps> & TabsComposition = ({
  type = 'line',
  position = 'horizontal',
  style,
  onTabClick,
  children,
}) => {
  const [selectedTab, setSelectedTab] = useState('1')
  const onTabSelect = useCallback(
    (value: string) => {
      onTabClick && onTabClick(value)
      setSelectedTab(value)
    },
    [onTabClick]
  )
  return (
    <TabsContext.Provider value={{ selectedTab, onTabSelect }}>
      <nav role="tablist">
        <ul>{children}</ul>
      </nav>
    </TabsContext.Provider>
  )
}

const TabsItem: React.FC<TabsItemProps> = ({ value, children }) => {
  const { selectedTab, onTabSelect } = useContext(TabsContext)
  const selected = useMemo(() => selectedTab === value, [selectedTab, value])
  const onSelect = useCallback(() => {
    onTabSelect(value)
  }, [value, onTabSelect])
  return (
    <li role="tab" aria-selected={selected} onClick={onSelect}>
      {children}
      {selected ? <m.div layoutId="selected" /> : null}
    </li>
  )
}

Tabs.Item = TabsItem

export { Tabs }

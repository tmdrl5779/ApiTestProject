import { genearteUUID } from '@/utils'
import { motion } from 'framer-motion'
import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import { tabsCss } from './styles'
import { TabPosition, TabType } from './types'

export type TabsItem = {
  title: string
  icon?: React.ReactNode
  code: string
}

export type TabsProps = {
  items: TabsItem[]
  type?: TabType
  tabPosition?: TabPosition
  background?: string
  onSelect?: (code: string) => void
}

export const Tabs: React.FC<TabsProps> = ({ items, onSelect, type = 'line', tabPosition = 'top', background }) => {
  const [selectedCode, setSelectedCode] = useState(items[0]?.code)
  const [uuid, _] = useState(genearteUUID())
  const handleSelect = useCallback(
    (code: string) => {
      onSelect?.(code)
      setSelectedCode(code)
    },
    [onSelect]
  )
  const tabsWrapperCss = useMemo(() => tabsCss.self(tabPosition, background, type), [background, tabPosition, type])
  const tabsItemCss = useMemo(() => tabsCss.item(tabPosition, background, type), [background, tabPosition, type])
  const tabsActiveLineCss = useMemo(
    () => tabsCss.activeLine(tabPosition, background, type),
    [background, tabPosition, type]
  )

  return (
    <ul css={tabsWrapperCss}>
      {items.map(item => (
        <li
          key={item.code}
          className={'item' + (selectedCode === item.code ? ' selected' : '')}
          css={tabsItemCss}
          onClick={() => handleSelect(item.code)}
        >
          {item.icon}
          <span style={{ marginLeft: item.icon ? '12px' : '0' }}>{item.title}</span>
          {selectedCode === item.code ? (
            <motion.div css={tabsActiveLineCss} className="active-line" layoutId={`active-line-${uuid}`} />
          ) : null}
        </li>
      ))}
      <li css={tabsItemCss} style={{ flex: '1 1 auto' }}></li>
    </ul>
  )
}

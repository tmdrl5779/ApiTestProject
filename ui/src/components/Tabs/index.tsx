import { color } from '@/data/variables.style'
import { createContext, useContext } from '@/utils/RobustContext'
import { css, SerializedStyles } from '@emotion/react'
import { motion } from 'framer-motion'
import React, { ReactNode, useCallback, useState } from 'react'

type TabsItem = {
  title: string
  icon?: React.ReactNode
  code: string
}

type TabsProps = {
  items: TabsItem[]
  type?: 'line' | 'card'
  tabPosition?: 'top' | 'right' | 'bottom' | 'left'
  onSelect?: (code: string) => void
}

const TabsContext = createContext<{
  selectedCode: string
  handleSelect: (code: string) => void
}>()

export const Tabs: React.FC<TabsProps> = ({ items, onSelect, type = 'line', tabPosition = 'top' }) => {
  const [selectedCode, setSelectedCode] = useState(items[0]?.code)
  const handleSelect = useCallback(
    (code: string) => {
      onSelect?.(code)
      setSelectedCode(code)
    },
    [onSelect]
  )
  return (
    <TabsContext.Provider value={{ selectedCode, handleSelect }}>
      <ul css={TabsCss}>
        {items.map(item => (
          <Item {...item} key={item.code} />
        ))}
      </ul>
    </TabsContext.Provider>
  )
}

const Item: React.FC<TabsItem> = ({ title, icon, code }) => {
  const { selectedCode, handleSelect } = useContext(TabsContext)
  const handleClick = useCallback(() => {
    handleSelect(code)
  }, [code, handleSelect])

  return (
    <li className={'item' + (selectedCode === code ? ' selected' : '')} onClick={handleClick}>
      {icon}
      <span className="item-title">{title}</span>
      {selectedCode === code ? <motion.div css={leftlineCss} layoutId="leftline" /> : null}
    </li>
  )
}

const TabsCss = css`
  overflow-x: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 0;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  margin-bottom: 0;
  padding-inline-start: 0;
  outline: none;
  transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  width: 100%;
  box-shadow: none;
  border-inline-end: 0px solid rgba(5, 5, 5, 0.06);

  &::before {
    display: table;
    content: '';
  }

  .item {
    color: ${color.secondaryText},
    margin: 0;
    white-space: nowrap;
    cursor: pointer;
    // overflow: hidden;
    text-overflow: ellipsis;
    margin-inline: 4px;
    margin-block: 4px;
    width: calc(100% - 8px);
    height: 52px;
    line-height: 52px;
    list-style-position: inside;
    list-style-type: disc;
    display: flex;
    align-items: center;
    transition: color 0.3s, background 0.3s, padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    position: relative;
    padding-left: 12px;
  }

  .selected, 
  .item:not(.selected):active,
  .item:not(.selected):hover {
    color: ${color.primaryText};
  }

  .item-title {
    margin-left: 12px;
  }
`

const leftlineCss = css`
  position: absolute;
  bottom: 0;
  left: 0px;
  top: 0;
  width: 2px;
  background: ${color.primaryText};
`

const TabsCommonCss = css`
  overflow-x: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 0;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  margin-bottom: 0;
  padding-inline-start: 0;
  outline: none;
  transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  width: 100%;
  box-shadow: none;
  border-inline-end: 0px solid rgba(5, 5, 5, 0.06);

  &::before {
    display: table;
    content: '';
  }

  .item {
    color: ${color.secondaryText},
    margin: 0;
    white-space: nowrap;
    cursor: pointer;
    // overflow: hidden;
    text-overflow: ellipsis;
    margin-inline: 4px;
    margin-block: 4px;
    width: calc(100% - 8px);
    height: 52px;
    line-height: 52px;
    list-style-position: inside;
    list-style-type: disc;
    display: flex;
    align-items: center;
    transition: color 0.3s, background 0.3s, padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    position: relative;
    padding-left: 12px;
  }

  .selected, 
  .item:not(.selected):active,
  .item:not(.selected):hover {
    color: ${color.primaryText};
  }

  .item-title {
    margin-left: 12px;
  }
`

const tabPositionCss: Record<Required<TabsProps>['tabPosition'], SerializedStyles> = {
  top: css``,
  right: css``,
  bottom: css``,
  left: css``,
}

const typeCss = {}

import { color } from '@/data/variables.style'
import { createContext, useContext } from '@/utils/RobustContext'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import React, { ReactNode, useCallback, useState } from 'react'

type NavigatorItem = {
  title: string
  icon?: React.ReactNode
  code: string
}

type NavigatorProp = {
  items: NavigatorItem[]
  onSelect?: (code: string) => void
}

const NavigatorContext = createContext<{
  selectedCode: string
  handleSelect: (code: string) => void
}>()

export const Navigator: React.FC<NavigatorProp> = ({ items, onSelect }) => {
  const [selectedCode, setSelectedCode] = useState(items[0]?.code)
  const handleSelect = useCallback((code: string) => {
    onSelect?.(code)
    setSelectedCode(code)
  }, [])
  return (
    <NavigatorContext.Provider value={{ selectedCode, handleSelect }}>
      <ul css={navigatorCss}>
        {items.map(item => (
          <Item {...item} key={item.code} />
        ))}
      </ul>
    </NavigatorContext.Provider>
  )
}

const Item: React.FC<NavigatorItem> = ({ title, icon, code }) => {
  const { selectedCode, handleSelect } = useContext(NavigatorContext)
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

const navigatorCss = css`
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

  .selected {
    // border-left: 1px solid ${color.primaryText}
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

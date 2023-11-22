import {
  CloseOutlinedIcon,
  DeleteOutlinedIcon,
  LeftOutlinedIcon,
  PlusOutlinedIcon,
  RightOutlinedIcon,
} from '@/data/icons'
import { color } from '@/data/variables.style'
import { useIsOverflow } from '@/hooks'
import { genearteUUID } from '@/utils'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React, { ReactElement, ReactNode, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Button } from '..'
import { ComponentCommonProps } from '../types'
import { tabsCss } from './styles'
import { TabPosition, TabType } from './types'

const editableTabsMotion = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  transition: { opacity: { duration: 0.25 }, x: { type: 'spring', stiffness: 300, damping: 30 } },
}

export type TabsItem = {
  title: string
  icon?: React.ReactNode
  code: string
}

export interface TabsProps extends ComponentCommonProps {
  items: TabsItem[]
  type?: TabType
  tabPosition?: TabPosition
  background?: string
  selectedCode?: string
  onSelect?: (code: string) => void
  onAdd?: (...args: any[]) => void
  onDelete?: (idx: number) => void
  editable?: boolean
  lineVisible?: boolean
  renderTabTitle?: (title: string) => ReactElement
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  onSelect,
  onAdd,
  onDelete,
  type = 'line',
  tabPosition = 'top',
  background,
  selectedCode,
  renderTabTitle,
  editable = false,
  lineVisible = true,
  style,
  _css,
}) => {
  const [_selectedCode, setSelectedCode] = useState(items[0]?.code)
  const [uuid, _] = useState(genearteUUID())

  const ulRef = useRef<HTMLUListElement>(null)
  const isUlOverflow = useIsOverflow(ulRef, false)

  const finalSelectedCode = selectedCode ? selectedCode : _selectedCode

  const handleSelect = useCallback(
    (code: string) => () => {
      onSelect?.(code)
      selectedCode === undefined && setSelectedCode(code)
    },
    [onSelect, selectedCode]
  )

  const handleAdd = useCallback(() => {
    onAdd?.()
  }, [onAdd])

  const handleDelete = useCallback(
    (idx: number) => (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      onDelete?.(idx)
    },
    [onDelete]
  )

  const scroll = useCallback((direction: 'left' | 'right') => {}, [])

  const tabsWrapperCss = useMemo(() => tabsCss.self(tabPosition, background, type), [background, tabPosition, type])
  const tabsItemCss = useMemo(() => tabsCss.item(tabPosition, background, type), [background, tabPosition, type])
  const tabsActiveLineCss = useMemo(
    () => tabsCss.activeLine(tabPosition, background, type),
    [background, tabPosition, type]
  )

  return (
    <motion.ul css={[tabsWrapperCss, _css]} style={style} ref={ulRef}>
      <AnimatePresence>
        {isUlOverflow ? (
          <motion.li
            layout
            key={'scroll-left-button'}
            css={tabsItemCss}
            style={{
              cursor: 'inherit',
              background: `${color.background}`,
              position: 'sticky',
              left: 0,
              zIndex: 4,
            }}
          >
            {editable ? (
              <Button type="text" onClick={handleAdd}>
                <LeftOutlinedIcon />
              </Button>
            ) : null}
          </motion.li>
        ) : null}
        {items.map((item, idx) => (
          <motion.li
            layout
            key={item.code}
            className={'item' + (finalSelectedCode === item.code ? ' selected' : '')}
            css={tabsItemCss}
            onClick={handleSelect(item.code)}
            {...(editable ? editableTabsMotion : {})}
            // initial={{ opacity: 0, x: -10 }}
            // animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: -10 }}
            // transition={{ opacity: { duration: 0.25 }, x: { type: 'spring', stiffness: 300, damping: 30 } }}
          >
            {item.icon}
            {renderTabTitle ? (
              renderTabTitle(item.title)
            ) : (
              <span style={{ marginLeft: item.icon ? '12px' : '0' }}>{item.title}</span>
            )}
            {editable ? (
              <Button type="text" onClick={handleDelete(idx)}>
                <CloseOutlinedIcon />
              </Button>
            ) : null}
            {lineVisible && finalSelectedCode === item.code ? (
              <motion.div css={tabsActiveLineCss} className="active-line" layoutId={`active-line-${uuid}`} />
            ) : null}
          </motion.li>
        ))}
        {isUlOverflow ? (
          <motion.li
            layout
            key={'scroll-right-button'}
            css={tabsItemCss}
            style={{
              cursor: 'inherit',
              background: `${color.background}`,
              position: 'sticky',
              right: '50px',
            }}
          >
            {editable ? (
              <Button type="text" onClick={handleAdd}>
                <RightOutlinedIcon />
              </Button>
            ) : null}
          </motion.li>
        ) : null}
        {editable ? (
          <motion.li
            layout
            key={'add-tab-button'}
            css={tabsItemCss}
            style={{
              cursor: 'inherit',
              background: `${color.background}`,
              position: 'sticky',
              right: 0,
            }}
          >
            {editable ? (
              <Button type="text" onClick={handleAdd} style={{ fontSize: '24px' }}>
                +
              </Button>
            ) : null}
          </motion.li>
        ) : null}
      </AnimatePresence>
    </motion.ul>
  )
}

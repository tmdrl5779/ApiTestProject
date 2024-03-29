import { color } from '@/data/variables.style'
import { useIsOverflow } from '@/hooks'
import { genearteUUID } from '@/utils'
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  MotionProps,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import React, {
  FC,
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Button } from '..'
import { ComponentCommonProps } from '../types'
import { tabsCss, scrollRightButtonCss, scrollLeftButtonCss, addButtonCss, addButtonWrapperCss } from './styles'
import { TabPosition, TabType } from './types'
import { scrollBy } from 'seamless-scroll-polyfill'
import { css } from '@emotion/react'
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'

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
  const [uuid] = useState(genearteUUID())

  const ulRef = useRef<HTMLUListElement>(null)
  const isUlOverflow = useIsOverflow(ulRef, false, items.length, editable ? 80 : 0)

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

  const scroll = useCallback((direction: 'left' | 'right') => {
    const { current } = ulRef
    if (current) {
      scrollBy(current, { left: direction === 'left' ? -200 : 200, behavior: 'smooth' })
    }
  }, [])

  const handleScroll = useCallback(
    (direction: 'left' | 'right') => () => {
      scroll(direction)
    },
    [scroll]
  )

  const tabsWrapperCss = useMemo(() => tabsCss.self(tabPosition, background, type), [background, tabPosition, type])
  const tabsItemCss = useMemo(() => tabsCss.item(tabPosition, background, type), [background, tabPosition, type])
  const tabsActiveLineCss = useMemo(
    () => tabsCss.activeLine(tabPosition, background, type),
    [background, tabPosition, type]
  )

  return (
    <motion.ul css={[tabsWrapperCss, _css]} style={style} ref={ulRef} layout layoutScroll>
      <AnimatePresence>
        {isUlOverflow ? (
          <TabItem
            key={`scroll-left-button-${uuid}`}
            motionKey={`scroll-left-button-${uuid}`}
            css={[tabsItemCss, scrollLeftButtonCss]}
          >
            <Button type="text" onClick={handleScroll('left')}>
              <LeftOutlined />
            </Button>
          </TabItem>
        ) : null}
        {items.map((item, idx) => (
          <TabItem
            title={item.title}
            key={`${uuid}-${item.code}`}
            motionKey={`${uuid}-${item.code}`}
            className={'item' + (finalSelectedCode === item.code ? ' selected' : '')}
            css={tabsItemCss}
            onClick={handleSelect(item.code)}
            {...(editable ? editableTabsMotion : {})}
          >
            {item.icon}
            {renderTabTitle ? (
              renderTabTitle(item.title)
            ) : (
              <span style={{ marginLeft: item.icon ? '12px' : '0' }}>{item.title}</span>
            )}
            {editable ? (
              <Button type="text" onClick={handleDelete(idx)}>
                <CloseOutlined />
              </Button>
            ) : null}
            {lineVisible && finalSelectedCode === item.code ? (
              <motion.div css={tabsActiveLineCss} className="active-line" layoutId={`active-line-${uuid}`} />
            ) : null}
          </TabItem>
        ))}

        {editable ? (
          <TabItem
            key={`add-tab-button-${uuid}`}
            motionKey={`add-tab-button-${uuid}`}
            css={[tabsItemCss, addButtonWrapperCss]}
          >
            <Button type="text" onClick={handleAdd} css={addButtonCss}>
              +
            </Button>
          </TabItem>
        ) : null}
        {isUlOverflow ? (
          <TabItem
            key={`scroll-right-button-${uuid}`}
            motionKey={`scroll-right-button-${uuid}`}
            _css={[tabsItemCss, scrollRightButtonCss]}
          >
            <Button type="text" onClick={handleScroll('right')}>
              <RightOutlined />
            </Button>
          </TabItem>
        ) : null}
      </AnimatePresence>
    </motion.ul>
  )
}

export interface TabItemProps extends ComponentCommonProps, Omit<MotionProps, 'style'> {
  motionKey?: string
  children?: React.ReactNode
  onClick?: () => void
  title?: string
}

export const TabItem: FC<TabItemProps> = ({ motionKey, children, _css, className, onClick, title }) => {
  return (
    <motion.li onClick={onClick} layout layoutScroll key={motionKey} css={_css} className={className} title={title}>
      {children}
    </motion.li>
  )
}

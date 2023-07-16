import { useContext } from '@/utils/RobustContext'
import { useCallback, useMemo } from 'react'
import { TabsContext } from './TabsContext'
import { motion } from 'framer-motion'
import { css } from '@emotion/react'
import { color } from '@/data/variables.style'

interface TabsItemProps {
  value: string
  children: React.ReactNode
}

// onClick이 각 tab아템마다 들어감, 부모에 1개만 걸어주자
export const TabsItem: React.FC<TabsItemProps> = ({ value, children }) => {
  const { selectedTab, onTabSelect } = useContext(TabsContext)
  const selected = useMemo(() => selectedTab === value, [selectedTab, value])
  const onSelect = useCallback(() => {
    onTabSelect(value)
  }, [value, onTabSelect])

  const css = selected ? [tabsItemCss, selectedTabsItemCss] : tabsItemCss

  return (
    <div
      role="tab"
      className="navItem"
      aria-selected={selected}
      onClick={onSelect}
      css={css}
      title={children?.toString()}
    >
      <span className="navItemText" css={tabsItemTextCss}>
        {children}
      </span>
      {selected ? (
        <motion.div
          className="navItemUnderline"
          css={underlineCss}
          initial={{ scaleX: 0, attrScale: -5 }}
          animate={{ scaleX: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        />
      ) : null}
    </div>
  )
}

const tabsItemTextCss = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const tabsItemCss = css`
  position: relative;
  display: inline-flex;
  padding: 10px 15px;
  align-items: center;
  align-self: stretch;
  font-size: 14px;
  background: 0 0;
  border: 0;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 40px;
  justify-content: center;
`

const selectedTabsItemCss = css`
  // font-weight: bold;
  color: ${color.accent};
  // background: #eee;
`

const underlineCss = css`
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  height: 1px;
  background: ${color.accent};
`

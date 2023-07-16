import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { useCallback } from 'react'
import { tabItems } from './constants'
import { TabItem } from './types'

export const ReqDataTabs: React.FC<{
  selectedTab: TabItem
  setSelectedTab: React.Dispatch<React.SetStateAction<TabItem>>
}> = ({ selectedTab, setSelectedTab }) => {
  const isSelected = useCallback((item: TabItem) => item.tabTitle === selectedTab.tabTitle, [selectedTab])
  return (
    <section css={tabsCss}>
      {tabItems.map(item => (
        <div css={isSelected(item) ? [tabItemCss, selectedCss] : tabItemCss} onClick={() => setSelectedTab(item)}>
          {item.tabTitle}
        </div>
      ))}
    </section>
  )
}

const tabsCss = css`
  display: flex;
`

const tabItemCss = css`
  border: 1px solid black;
  padding: 4px;
  margin: 0 1px;
  cursor: pointer;
`

const selectedCss = css`
  font-weight: bold;
  color: ${color.accent};
`

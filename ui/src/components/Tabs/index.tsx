import { Children, ReactNode, useCallback, useMemo, useState } from 'react'
import { useContext } from '@/utils/RobustContext'
import { TabsContext } from './TabsContext'
import { validateTabsItems } from './utils/validateTabsItems'
import { get1stTabsItem } from './utils/get1stTabsItem'
import { TabsItem } from './TabsItem'
import { css } from '@emotion/react'

interface TabsProps {
  type?: 'card' | 'line'
  position?: 'left' | 'right' | 'top' | 'bottom'
  style?: React.CSSProperties
  onTabClick?: (key: string) => void
  children: React.ReactNode
}

interface TabsComposition {
  Item: typeof TabsItem
}

// TODO
// 1. context 최적화 -> 따로 공통 훅 useRobustContext, createRobustContext(generic활용) 등으로 꺼내 쓰면 좋을 듯 (O) - 테스트 코드 추가 필요
// 2. 탭 넘칠 때 스크롤, 탭 add, 삭제(hover or active시 x버튼 표시)
// 3. 탭 형태에 따라 css 다르게 주기
// 4. 탭 position에 따라 css 다르게
// 5. 탭 테스트 코드
// 6. 탭 scaleX 시작지점에서 맨 왼쪽으로 옮기기
// 7. 스토리북 적용
const Tabs: React.FC<TabsProps> & TabsComposition = ({
  type = 'line',
  position = 'horizontal',
  style,
  onTabClick,
  children,
}) => {
  const [selectedTab, setSelectedTab] = useState(get1stTabsItem(children))
  const onTabSelect = useCallback(
    (value: string) => {
      onTabClick && onTabClick(value)
      setSelectedTab(value)
    },
    [onTabClick]
  )

  validateTabsItems(children)

  return (
    <TabsContext.Provider value={{ selectedTab, onTabSelect }}>
      <nav role="tablist" css={[tabsNavCss, tabsNavLeftCss]}>
        <div className="navWrap">
          <div className="navList">{children}</div>
        </div>
      </nav>
    </TabsContext.Provider>
  )
}

Tabs.Item = TabsItem

// antd꺼 가져옴

const tabsNavCss = css`
  position: relative;
  display: flex;
  flex: none;
  align-items: center;

  .navWrap {
    box-sizing: border-box;
    display: flex;
    flex: auto;
    align-self: stretch;
    overflow: hidden;
    white-space: nowrap;
    transform: translate(0);
  }

  .navList {
    transform: translate(0px, 0px);
    position: relative;
    display: flex;
    transition: opacity 0.3s;
  }

  .navItem {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .navItemText {
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
  }

  .navItemUnderline {
  }
`

const tabsNavLeftCss = css`
  flex-direction: column;
  min-width: 40px;
  .navWrap {
    flex-direction: column;
  }

  .navList {
    flex: 1 0 auto;
    flex-direction: column;
  }
`

export { Tabs }

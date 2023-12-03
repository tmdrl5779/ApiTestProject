import '../src/assets/global.css'
import { GNB, SNB, Layout, Content } from './layouts'
import { APIs, APIMerge, PerformTest } from './pages'
import { ApiOutlinedIcon, BarChartOutlinedIcon, MergeCellsOutlinedIcon } from './data/icons'
import { useCallback, useState } from 'react'
import { Funnel } from './components/Funnel'
import { AnimatePresence, motion } from 'framer-motion'
import { css } from '@emotion/react'
import { Blinker, Tabs } from './components'
import { RecoilRoot } from 'recoil'

const navItems = [
  {
    title: 'API 호출',
    code: 'callApi',
    icon: <ApiOutlinedIcon />,
  },
  {
    title: '성능 테스트',
    code: 'performanceTest',
    icon: <BarChartOutlinedIcon />,
  },
  {
    title: 'API 합치기',
    code: 'mergeApi',
    icon: <MergeCellsOutlinedIcon />,
  },
]

function App() {
  const [selectedItemCode, setSelectedItemCode] = useState(navItems[0].code)
  const onSelect = useCallback((code: string) => {
    setSelectedItemCode(code)
  }, [])
  return (
    <RecoilRoot>
      <div className="App">
        <GNB>API Test</GNB>
        <Layout style={{ flexDirection: 'row' }}>
          <SNB>
            <Tabs items={navItems} onSelect={onSelect} tabPosition="right" style={{ overflowX: 'hidden' }} />
          </SNB>
          <Content>
            <Blinker _key={selectedItemCode} _css={contentWrapperCss}>
              <Funnel steps={navItems.map(item => item.code)} step={selectedItemCode}>
                <Funnel.Step name="callApi">
                  <APIs />
                </Funnel.Step>
                <Funnel.Step name="performanceTest">
                  <PerformTest />
                </Funnel.Step>
                <Funnel.Step name="mergeApi">
                  <APIMerge />
                </Funnel.Step>
              </Funnel>
            </Blinker>
          </Content>
        </Layout>
      </div>
    </RecoilRoot>
  )
}

const contentWrapperCss = css`
  height: 100%;
`

export default App

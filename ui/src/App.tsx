import '../src/assets/global.css'
import { GNB, SNB, Layout, Content } from './layouts'
// import { APIs, APIMerge, PerformTest } from './pages'
const APIs = lazy(() => import('./pages').then(module => ({ default: module['APIs'] })))
const APIMerge = lazy(() => import('./pages').then(module => ({ default: module['APIMerge'] })))
const PerformTest = lazy(() => import('./pages').then(module => ({ default: module['PerformTest'] })))
import { ApiOutlinedIcon, BarChartOutlinedIcon, MergeCellsOutlinedIcon } from './data/icons'
import { lazy, useCallback, useState } from 'react'
import { Funnel } from './components/Funnel'
import { AnimatePresence, motion } from 'framer-motion'
import { css } from '@emotion/react'
import { Blinker, Tabs } from './components'
import { RecoilRoot } from 'recoil'
import { GlobalErrorBoundary } from './components/ErrorBoundary/GloablErrorBoundary'

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
    <GlobalErrorBoundary>
      <RecoilRoot>
        <div className="App">
          <GNB>Postweb</GNB>
          <Layout style={{ flexDirection: 'row' }}>
            <SNB>
              <Tabs items={navItems} onSelect={onSelect} tabPosition="right" style={{ overflowX: 'hidden' }} />
            </SNB>
            <Content>
              <div css={contentWrapperCss}>
                <Blinker _key={selectedItemCode}>
                  <Funnel step={selectedItemCode}>
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
              </div>
            </Content>
          </Layout>
        </div>
      </RecoilRoot>
    </GlobalErrorBoundary>
  )
}

const contentWrapperCss = css`
  height: 100%;
`

export default App

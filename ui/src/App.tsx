import '../src/assets/global.css'
import { GNB, SNB, Layout, Content } from './layouts'
import { APIs, APIMerge, PerformTest } from './pages'
import { ApiOutlinedIcon, BarChartOutlinedIcon, MergeCellsOutlinedIcon } from './data/icons'
import { Navigator } from './components/Navigator'
import { useCallback, useState } from 'react'
import { Funnel } from './components/Funnel'
import { AnimatePresence, motion } from 'framer-motion'

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
    <div className="App">
      <GNB>API Test</GNB>
      <Layout style={{ flexDirection: 'row' }}>
        <SNB>
          <Navigator items={navItems} onSelect={onSelect} />
        </SNB>
        <Content>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItemCode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
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
            </motion.div>
          </AnimatePresence>
        </Content>
      </Layout>
    </div>
  )
}

export default App

import { Blinker, Funnel, Tabs, TabsItem } from '@/components'
import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { FetchApiResponse } from 'api-types'
import { FC, useCallback, useState } from 'react'
import { DataForResponseViewer } from '../../types'
import { Body } from './TabContent/Body'
import { Cookies } from './TabContent/Cookies'
import { Headers } from './TabContent/Headers'
import { TestResults } from './TabContent/TestResults'

export const resTabItems: TabsItem[] = [
  { title: 'Body', code: 'Body' },
  { title: 'Cookies', code: 'Cookies' },
  { title: 'Headers', code: 'Headers' },
  // { title: 'Test Results', code: 'Test Results' },
]

interface APIResponseViewerProps {
  data: DataForResponseViewer | null
}

export const APIResponseViewer: FC<APIResponseViewerProps> = ({ data }) => {
  // TODO: props 다 주지말고 context 쓰자
  const [selectedTabCode, setSelectedTabCode] = useState(resTabItems[0].code)
  const onSelectTab = useCallback((code: string) => {
    setSelectedTabCode(code)
  }, [])
  if (data === null) {
    return <span>데이터가 업다</span>
  }
  return (
    <>
      <Tabs
        items={resTabItems}
        selectedCode={selectedTabCode}
        onSelect={onSelectTab}
        background={color.background}
        style={{ position: 'sticky', top: 0 }}
        type="line"
        tabPosition="top"
      />
      <Blinker _key={selectedTabCode} _css={blinkerCss}>
        <Funnel steps={resTabItems.map(item => item.code)} step={selectedTabCode}>
          <Funnel.Step name="Body">
            <Body body={data.body} />
          </Funnel.Step>
          <Funnel.Step name="Cookies">
            <Cookies cookies={data.cookies} />
          </Funnel.Step>
          <Funnel.Step name="Headers">
            <Headers headers={data.headers} />
          </Funnel.Step>
          {/* <Funnel.Step name="Test Results">
            <TestResults />
          </Funnel.Step> */}
        </Funnel>
      </Blinker>
    </>
  )
}

const blinkerCss = css`
  height: calc(100% - 52px);
`

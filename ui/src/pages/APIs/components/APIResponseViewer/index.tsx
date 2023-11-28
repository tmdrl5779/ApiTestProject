import { Blinker, Funnel, Tabs, TabsItem } from '@/components'
import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { FetchApiResponse } from 'api-types'
import { FC, useCallback, useState } from 'react'
import { Body } from './TabContent/Body'
import { Cookies } from './TabContent/Cookies'
import { Headers } from './TabContent/Headers'
import { TestResults } from './TabContent/TestResults'
import { APIResponseViewerProps } from './types'

export const resTabItems: TabsItem[] = [
  { title: 'Body', code: 'Body' },
  { title: 'Cookies', code: 'Cookies' },
  { title: 'Headers', code: 'Headers' },
  { title: 'Test Results', code: 'Test Results' },
]

export const APIResponseViewer: FC<APIResponseViewerProps> = ({ response }) => {
  // TODO: props 다 주지말고 context 쓰자
  const [selectedTabCode, setSelectedTabCode] = useState(resTabItems[0].code)
  const onSelectTab = useCallback((code: string) => {
    setSelectedTabCode(code)
  }, [])
  return (
    <>
      <Tabs
        items={resTabItems}
        selectedCode={selectedTabCode}
        onSelect={onSelectTab}
        background={color.background}
        type="line"
        tabPosition="top"
      />
      <Blinker _key={selectedTabCode} _css={blinkerCss}>
        <Funnel steps={resTabItems.map(item => item.code)} step={selectedTabCode}>
          <Funnel.Step name="Body">
            <Body response={response} />
          </Funnel.Step>
          <Funnel.Step name="Cookies">
            <Cookies />
          </Funnel.Step>
          <Funnel.Step name="Headers">
            <Headers />
          </Funnel.Step>
          <Funnel.Step name="Test Results">
            <TestResults />
          </Funnel.Step>
        </Funnel>
      </Blinker>
    </>
  )
}

const blinkerCss = css`
  height: calc(100% - 52px);
`

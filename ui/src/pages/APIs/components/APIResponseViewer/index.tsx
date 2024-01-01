import { Blinker, Funnel, Tabs, TabsItem, Error, ErrorBoundary } from '@/components'
import { color, statusColor } from '@/data/variables.style'
import { ApiOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { FetchApiResponse, FetchApiResponseError, IAPI } from 'api-types'
import { FC, useCallback, useState } from 'react'
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

export const isResponseError = (response: IAPI['response']): response is FetchApiResponseError => {
  return response !== null && 'code' in response && 'message' in response
}

interface APIResponseViewerProps {
  response: IAPI['response']
}

export const APIResponseViewer: FC<APIResponseViewerProps> = ({ response }) => {
  // TODO: props 다 주지말고 context 쓰자
  const [selectedTabCode, setSelectedTabCode] = useState(resTabItems[0].code)
  const onSelectTab = useCallback((code: string) => {
    setSelectedTabCode(code)
  }, [])
  if (response === null) {
    return (
      <Error
        message={'응답을 받기 위해 Send 버튼을 누르세요.'}
        icon={<ApiOutlined rev={'?'} style={{ fontSize: '100px' }} />}
      />
    )
  }
  if (isResponseError(response)) {
    return <Error message={`${response.code}: ${response.message}`} />
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
      <div css={statusCss}>
        <span className="item">
          Status: <span className="data">{response.status}</span>
        </span>
        <span className="item">
          Time: <span className="data">{response.responseTime} ms</span>
        </span>
      </div>
      <Blinker _key={selectedTabCode} _css={blinkerCss}>
        <Funnel steps={resTabItems.map(item => item.code)} step={selectedTabCode}>
          <Funnel.Step name="Body">
            <Body body={response.body} />
          </Funnel.Step>
          <Funnel.Step name="Cookies">
            <Cookies cookies={response.cookies} />
          </Funnel.Step>
          <Funnel.Step name="Headers">
            <Headers headers={response.headers} />
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

const statusCss = css`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: 52px;
  font-size: 16px;
  .item {
    color: ${color.secondaryText};
    margin-right: 8px;
  }
  .data {
    color: ${statusColor.GOOD};
  }
`

import { Blinker, Funnel, Tabs, TabsItem, ErrorBoundary, Info, Error } from '@/components'
import { ApiOutlinedBigIcon } from '@/data/icons'
import { color, statusColor } from '@/data/variables.style'
import { ApiOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { FetchApiResponse, FetchApiResponseError, IAPI } from 'api-types'
import { FC, useCallback, useState } from 'react'
import { Body } from './Body'
import { Cookies } from './Cookies'
import { Headers } from './Headers'

export const resTabItems: TabsItem[] = [
  { title: 'Body', code: 'Body' },
  { title: 'Cookies', code: 'Cookies' },
  { title: 'Headers', code: 'Headers' },
]

const isError = (response: IAPI['response']): response is FetchApiResponseError => {
  return response !== null && 'name' in response && 'message' in response
}

const apiError = {
  name: 'API 에러',
  message: 'API 요청 중에 오류가 발생했어요.',
}

export interface APIResponseViewerProps {
  response: IAPI['response']
}

export const APIResponseViewer: FC<APIResponseViewerProps> = ({ response }) => {
  const [selectedTabCode, setSelectedTabCode] = useState(resTabItems[0].code)
  const onSelectTab = useCallback((code: string) => {
    setSelectedTabCode(code)
  }, [])
  if (response === null) {
    return <Info message={'응답을 받기 위해 Send 버튼을 눌러주세요.'} icon={<ApiOutlinedBigIcon />} />
  }
  if (isError(response)) {
    return <Error error={response} />
  }
  return (
    <div css={apiResponseMainCss}>
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
      <Blinker _key={selectedTabCode}>
        <Funnel step={selectedTabCode}>
          <Funnel.Step name="Body">
            <Body body={response.body} />
          </Funnel.Step>
          <Funnel.Step name="Cookies">
            <Cookies cookies={response.cookies} />
          </Funnel.Step>
          <Funnel.Step name="Headers">
            <Headers headers={response.headers} />
          </Funnel.Step>
        </Funnel>
      </Blinker>
    </div>
  )
}

const apiResponseMainCss = css`
  height: 100%;
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
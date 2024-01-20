import { Blinker, Funnel, Tabs, TabsItem, ErrorBoundary, Info, Error } from '@/components'
import { ApiOutlinedBigIcon } from '@/data/icons'
import { color, statusColor } from '@/data/variables.style'
import { ApiOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { FetchApiResponse, FetchApiResponseError, IAPI } from 'api-types'
import { FC, useCallback, useState } from 'react'
import { getStatusColor, isErrorCode, parseStatus } from '../..'
import { getTimeColor } from '../../utils/getTimeColor'
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

const isDestinationError = (
  response: FetchApiResponse
):
  | boolean
  | {
      name: string
      message: string
    } => {
  const [code, message] = parseStatus(response.status)
  console.log(code, message)
  if (isErrorCode(code)) {
    return {
      name: code,
      message,
    }
  }
  return false
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
  const destinationError = isDestinationError(response)
  console.log(destinationError)
  if (typeof destinationError !== 'boolean') {
    return <Error error={destinationError} />
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
          Status: <span style={{ color: getStatusColor(response.status) }}>{response.status}</span>
        </span>
        <span className="item">
          Time: <span style={{ color: getTimeColor(response.responseTime) }}>{response.responseTime} ms</span>
        </span>
      </div>
      <div css={apiResponseContentCss}>
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
    </div>
  )
}

const apiResponseMainCss = css`
  height: 100%;
  position: relative;
`

const height = {
  tabs: '52px',
}

const apiResponseContentCss = css`
  height: calc(100% - ${height.tabs});
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

import { Blinker, Funnel, Tabs, TabsItem } from '@/components'
import { color } from '@/data/variables.style'
import { parseResponse, ServerResponse } from '@/features/API'
import { css } from '@emotion/react'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { ResultGraph } from './ResultGraph'
import { ResultTree } from './ResultTree'
import { SummaryReport } from './SummaryReport'
import { APITestResponse } from './types'
import { composeGraphData } from './utils/composeGraphData'
import { composeSummaryReport } from './utils/composeSummaryReport'
import { parseTestResponse } from './utils/parseTestResponse'

const testWebsocketUrl = `${process.env.REACT_APP_ADAPTOR_WEBSOCKET_URL}/api/perform/socket-connect`

const steps: TabsItem[] = [
  {
    title: '결과 트리',
    code: 'ResultTree',
  },
  {
    title: '결과 그래프',
    code: 'ResultGraph',
  },
  {
    title: '요약 보고서',
    code: 'SummaryReport',
  },
]

interface ResultPanelProps {
  startTestMsg: string | null
}

export const ResultPanel: FC<ResultPanelProps> = ({ startTestMsg }) => {
  const [APITestResponses, setAPITestResponses] = useState<APITestResponse[]>([])
  const [step, setStep] = useState<(typeof steps)[number]>(steps[0])
  // websocket
  const { sendMessage, lastMessage, getWebSocket } = useWebSocket(testWebsocketUrl)
  const startTimeRef = useRef(0)

  useEffect(() => {
    return () => {
      getWebSocket()?.close()
    }
  }, [getWebSocket])

  useEffect(() => {
    if (lastMessage !== null && !lastMessage.data.startsWith('connection')) {
      const parsedLastMessage = JSON.parse(lastMessage.data)
      const testResponse = parseTestResponse(parsedLastMessage)
      testResponse.totalTime = lastMessage.timeStamp
      setAPITestResponses(prev => prev.concat(testResponse))
    } else if (lastMessage?.data.includes('open')) {
      if (startTestMsg !== null) {
        sendMessage(startTestMsg)
      }
      startTimeRef.current = lastMessage?.timeStamp
    }
  }, [lastMessage, sendMessage, setAPITestResponses, startTestMsg])
  //// websocket

  const onSelectTab = useCallback((code: string) => {
    setStep(steps.find(step => step.code === code) as TabsItem)
  }, [])

  const summaryReport = useMemo(() => composeSummaryReport(APITestResponses), [APITestResponses])

  const graphData = useMemo(() => composeGraphData(startTimeRef.current, APITestResponses), [APITestResponses])

  return (
    <section css={wrapperCss}>
      <Tabs
        items={steps}
        selectedCode={step.code}
        onSelect={onSelectTab}
        background={color.background}
        tabPosition="top"
      />
      <div css={contentCss}>
        <Blinker _key={step.code}>
          <Funnel step={step.code}>
            <div css={flexCss}>
              <Funnel.Step name="ResultTree">
                <ResultTree APITestResponses={APITestResponses} />
              </Funnel.Step>
              <Funnel.Step name="SummaryReport">
                <SummaryReport summaryReport={summaryReport} />
              </Funnel.Step>
              <Funnel.Step name="ResultGraph">
                <ResultGraph graphData={graphData} />
              </Funnel.Step>
            </div>
          </Funnel>
        </Blinker>
      </div>
    </section>
  )
}

const wrapperCss = css`
  height: 100%;
  width: 100%;
`

const height = {
  tabs: '52px',
}

const contentCss = css`
  height: calc(100% - ${height.tabs});
  width: 100%;
  border-top: 1px solid ${color.pale};
`

const flexCss = css`
  display: flex;
  ${wrapperCss};
`

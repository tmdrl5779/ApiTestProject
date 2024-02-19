import { Blinker, Button, Funnel, Progress, Tabs, TabsItem } from '@/components'
import { MetaDataForTestState } from '@/data/store'
import { color } from '@/data/variables.style'
import { parseResponse, ServerResponse } from '@/features/API'
import { useQueueing } from '@/hooks'
import { css } from '@emotion/react'
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { useRecoilValue } from 'recoil'
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
  goToEdit: () => void
  startTestMsg: string | null
}

export const ResultPanel: FC<ResultPanelProps> = memo(({ goToEdit, startTestMsg }) => {
  const testMetaData = useRecoilValue(MetaDataForTestState)
  const [APITestResponses, setAPITestResponses] = useState<APITestResponse[]>([])
  const [step, setStep] = useState<(typeof steps)[number]>(steps[0])
  const startTimeRef = useRef(0)
  // websocket
  useQueueing({
    websocketUrl: testWebsocketUrl,
    startMsg: startTestMsg,
    onQueue: useCallback((queue: Array<MessageEvent<any>>) => {
      setAPITestResponses(prev => {
        const added = queue.map(msg => {
          const response = parseTestResponse(JSON.parse(msg?.data))
          response.totalTime = msg?.timeStamp as number
          return response
        })
        return [...prev, ...added]
      })
    }, []),
    onOpen: useCallback((msg: MessageEvent<any>) => {
      startTimeRef.current = msg?.timeStamp
    }, []),
  })

  //// websocket

  const onSelectTab = useCallback((code: string) => {
    setStep(steps.find(step => step.code === code) as TabsItem)
  }, [])

  const summaryReport = useMemo(() => composeSummaryReport(APITestResponses), [APITestResponses])

  const graphData = useMemo(() => composeGraphData(startTimeRef.current, APITestResponses), [APITestResponses])

  const { repeatCount, interval, userCount } = testMetaData

  const testPercent = Number(((APITestResponses.length / (repeatCount * userCount)) * 100).toFixed())
  const testElapsedTime = Number((((100 - testPercent) / 100) * (repeatCount - 1) * interval).toFixed(2))

  return (
    <>
      <div css={controlCss}>
        <Progress percent={testPercent} elapsedTime={testElapsedTime} />
        <Button onClick={goToEdit} _css={backButtonCss}>
          뒤로 가기
        </Button>
      </div>
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
    </>
  )
})

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
const controlCss = css`
  display: flex;
  position: absolute;
  right: 12px;
  align-items: center;
`

const backButtonCss = css`
  background: white;
  color: black;
  top: 10px;
  height: 40px;
  font-size: 16px;
  margin-left: 16px;
`

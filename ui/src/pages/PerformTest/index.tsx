import { Accordion, Button, ErrorBoundary, Funnel, Input, useAccordion } from '@/components'
import { color, overlayScrollBarYCss } from '@/data/variables.style'
import { useAPIList } from '@/hooks'
import { css } from '@emotion/react'
import { useCallback, useEffect, useState } from 'react'
import { APIRequestEditor, APIResponseViewer, renderAPITabTitle } from '@/features/API'
import { useTestMetaData } from './useTestMetaData'
import { AnimatePresence, motion } from 'framer-motion'
import { getDefaultFetchApiResponse } from '@/data/constants'
import { FetchApiResponse, FetchApiResponseError } from 'api-types'
import useWebSocket, { ReadyState } from 'react-use-websocket'

const testWebsocketUrl = `ws://localhost:8080/api/perform/socket-connect`

interface APITestResponse {
  responseList: Array<Omit<FetchApiResponse, 'cookies' | 'headers'>>
  totalTime: number
  result: boolean
  userId: string
}

export const PerformTest: React.FC = () => {
  const { APIList, createAPI, deleteAPI, updateAPI } = useAPIList({ type: 'Test' })
  const { testMetaData, testMetaDataConfig } = useTestMetaData()
  const [expanded, setExpanded] = useAccordion()
  const [step, setStep] = useState<'edit' | 'result'>('edit')
  const [APITestResponses, setAPITestResponses] = useState<APITestResponse[]>([
    // {
    //   responseList: [
    //     {
    //       responseTime: 1687,
    //       body: {
    //         userId: 1,
    //         id: 1,
    //         title: 'delectus aut autem',
    //         completed: false,
    //       },
    //       status: '200 OK',
    //     },
    //   ],
    //   totalTime: 10,
    //   result: true,
    //   userId: 'USER-6',
    // },
  ])
  const [showed, setShowed] = useState<false | { tIdx: number; rIdx: number }>(false)

  // websocket
  const { sendMessage, lastMessage, readyState } = useWebSocket(testWebsocketUrl)

  useEffect(() => {
    if (step === 'result') {
      sendMessage(
        JSON.stringify({
          userCount: testMetaData.userCount,
          repeatCount: testMetaData.repeatCount,
          interval: testMetaData.interval,
          requestDataList: {
            performType: testMetaData.isConcur ? 'CONCUR' : 'SEQ',
            requestList: APIList,
          },
        })
      )
    }
  }, [
    APIList,
    sendMessage,
    step,
    testMetaData.interval,
    testMetaData.isConcur,
    testMetaData.repeatCount,
    testMetaData.userCount,
  ])

  useEffect(() => {
    if (lastMessage !== null) {
      const parsedLastMessage = JSON.parse(lastMessage.data)
      setAPITestResponses(prev => prev.concat(parsedLastMessage))
    }
  }, [lastMessage, setAPITestResponses])
  //// websocket

  const onClickResponseListItem = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.hasAttribute('id')) {
      const [tIdx, rIdx] = e.target.id.split('-').map(idx => Number(idx))
      setShowed({ tIdx, rIdx })
    }
  }, [])

  const onClickAddButton = useCallback(() => {
    createAPI()
  }, [createAPI])

  // 눌르면 1)소켓 연결 2)결과 페이지로 넘어감
  const onClickRunButton = useCallback(() => {
    setStep('result')
  }, [])

  return (
    <div css={performTestMainCss}>
      <Funnel step={step}>
        <Funnel.Step name="edit">
          <section css={metaDataEditorCss}>
            {testMetaDataConfig.map((config, idx) => (
              <div className="row" key={config.label}>
                <label className="label">{config.label}: </label>
                <Input {...config} className="input" />
                {idx === testMetaDataConfig.length - 1 ? (
                  <div css={controlCss}>
                    <Button _css={controlButtonCss} onClick={onClickAddButton} className="control-button">
                      API 추가
                    </Button>
                    <Button _css={controlButtonCss} onClick={onClickRunButton} className="control-button">
                      RUN
                    </Button>
                  </div>
                ) : null}
              </div>
            ))}
          </section>
          <motion.section layout layoutScroll css={apiEditorCss}>
            {APIList.map((api, idx) => (
              <Accordion
                key={api.uuid}
                idx={idx}
                expanded={expanded}
                setExpanded={setExpanded}
                height="300px"
                title={renderAPITabTitle(
                  `${api.request.httpMethod} ${api.request.url === '' ? 'Untitled Request' : api.request.url}`
                )}
              >
                <APIRequestEditor api={api} updateAPI={updateAPI} idx={idx} hasFetchFunc={false} />
              </Accordion>
            ))}
          </motion.section>
        </Funnel.Step>
        <Funnel.Step name="result">
          <section css={flexCss}>
            <motion.div css={responseListCss} onClick={onClickResponseListItem} layout layoutScroll>
              <AnimatePresence>
                {APITestResponses.map((testResponse, tIdx) =>
                  testResponse.responseList.map((responseEach, rIdx) => (
                    <motion.div
                      layout
                      layoutScroll
                      key={`${tIdx}-${rIdx}`}
                      css={responseListItemCss}
                      id={`${tIdx}-${rIdx}`}
                      className={showed !== false && showed?.tIdx === tIdx && showed?.rIdx === rIdx ? 'active' : ''}
                      whileHover={{
                        color: color.primaryText,
                      }}
                    >
                      {`${testResponse.userId} ${responseEach?.status}`}{' '}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
            <div css={responseDetailCss}>
              {showed ? (
                <ErrorBoundary>
                  <APIResponseViewer
                    response={APITestResponses[showed.tIdx]?.responseList[showed.rIdx] as FetchApiResponse}
                  />
                </ErrorBoundary>
              ) : null}
            </div>
          </section>
        </Funnel.Step>
      </Funnel>
    </div>
  )
}

const flexCss = css`
  display: flex;
  height: 100%;
  width: 100%;
`

const performTestMainCss = css`
  height: 100%;
  padding: 8px;
`

const width = {
  metaData: {
    label: '200px',
    input: '200px',
    gap: '8px',
  },
  controlButton: '80px',
}

const height = {
  metaDataEditor: '160px',
  controlButton: '40px',
}

const metaDataEditorCss = css`
  height: ${height.metaDataEditor};
  .row {
    display: flex;
    justify-content: left;
    align-items: space-between;
    padding: 4px 8px;
    width: 100%;
    .label {
      font-size: 16px;
      width: ${width.metaData.label};
      text-align: right;
      margin-right: ${width.metaData.gap};
    }
    .input {
      width: calc(100% - ${width.metaData.label});
    }
    .input[type='checkbox'] {
      width: 16px;
      margin-top: 2px;
      margin-left: 0px;
    }
  }
`

const controlCss = css`
  display: flex;
  justify-content: end;
  width: 100%;
`

const controlButtonCss = css`
  width: ${width.controlButton};
  height: ${height.controlButton};
  margin-left: 4px;
  justify-self: right;
`

const apiEditorCss = css`
  height: calc(100% - ${height.metaDataEditor});
  ${overlayScrollBarYCss};
`

const responseListCss = css`
  width: 30%;
  height: 100%;
  padding: 0px 8px;
  border-right: 1px solid ${color.pale};
`
// TODO: accordion header와 css 겹침 card로 컴포넌트로 따로 빼기
const responseListItemCss = css`
  background: ${color.navBar};
  border: 1px solid ${color.pale};
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding: 4px;
  margin-top: 8px;
  color: ${color.secondaryText};
  &.active {
    color: ${color.primaryText} !important;
  }
`

const responseDetailCss = css`
  position: relative;
  width: 70%;
  height: 100%;
  padding: 0px 8px;
  overflow: hidden;
`

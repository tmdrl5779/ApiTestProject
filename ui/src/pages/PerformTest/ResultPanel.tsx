import { Blinker, ErrorBoundary } from '@/components'
import { color, overlayScrollBarYCss } from '@/data/variables.style'
import { APIResponseViewer, parseResponse, ServerResponse } from '@/features/API'
import { css } from '@emotion/react'
import { FetchApiResponse } from 'api-types'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, useCallback, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'

interface APITestResponse {
  responseList: FetchApiResponse[]
  totalTime: number
  result: boolean
  userId: string
}

const testWebsocketUrl = `${process.env.REACT_APP_ADAPTOR_WEBSOCKET_URL}/api/perform/socket-connect`

export const parseTestResponse = (
  testResponse: Omit<APITestResponse, 'responseList'> & { responseList: ServerResponse[] }
): APITestResponse => {
  return {
    ...testResponse,
    responseList: testResponse.responseList.map(response => parseResponse(response)),
  }
}

interface ResultPanelProps {
  startTestMsg: string | null
}

export const ResultPanel: FC<ResultPanelProps> = ({ startTestMsg }) => {
  const [showed, setShowed] = useState<false | { tIdx: number; rIdx: number }>(false)
  const [APITestResponses, setAPITestResponses] = useState<APITestResponse[]>([])
  // websocket
  const { sendMessage, lastMessage, getWebSocket } = useWebSocket(testWebsocketUrl)

  useEffect(() => {
    if (startTestMsg !== null) {
      sendMessage(startTestMsg)
    }
  }, [startTestMsg, sendMessage, getWebSocket])

  useEffect(() => {
    return () => {
      getWebSocket()?.close()
    }
  }, [getWebSocket])

  useEffect(() => {
    if (lastMessage !== null && !lastMessage.data.startsWith('connection')) {
      const parsedLastMessage = JSON.parse(lastMessage.data)
      const testResponse = parseTestResponse(parsedLastMessage)
      setAPITestResponses(prev => prev.concat(testResponse))
    }
  }, [lastMessage, setAPITestResponses])
  //// websocket

  const onClickResponseListItem = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.hasAttribute('id')) {
      const [tIdx, rIdx] = e.target.id.split('-').map(idx => Number(idx))
      setShowed({ tIdx, rIdx })
    }
  }, [])
  return (
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{
                  color: color.primaryText,
                }}
                whileTap={{
                  scale: 0.9,
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
            <Blinker _key={`${showed.tIdx}-${showed.rIdx}`}>
              <APIResponseViewer
                response={APITestResponses[showed.tIdx]?.responseList[showed.rIdx] as FetchApiResponse}
              />
            </Blinker>
          </ErrorBoundary>
        ) : null}
      </div>
    </section>
  )
}

const flexCss = css`
  display: flex;
  height: 100%;
  width: 100%;
`

const responseListCss = css`
  width: 30%;
  height: 100%;
  padding: 0px 8px;
  border-right: 1px solid ${color.pale};
  ${overlayScrollBarYCss};
`
// TODO: accordion header와 css 겹침 card로 컴포넌트로 따로 빼기
const responseListItemCss = css`
  background: ${color.navBar};
  border: 1px solid ${color.pale};
  border-radius: 4px;
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
    border: 1px solid ${color.secondaryText} !important;
  }
`

const responseDetailCss = css`
  position: relative;
  width: 70%;
  height: 100%;
  padding: 0px 8px;
  overflow: hidden;
`

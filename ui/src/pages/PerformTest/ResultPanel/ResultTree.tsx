import { Blinker, ErrorBoundary, Tabs } from '@/components'
import { color, overlayScrollBarYCss, statusColor } from '@/data/variables.style'
import { APIResponseViewer, renderResponseTabTitle } from '@/features/API'
import { css } from '@emotion/react'
import { FetchApiResponse } from 'api-types'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { APITestResponse } from './types'
import { areEqual, FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { ResponseListViewer } from './ResponseListViewer'

interface ResponseGroupItemProps {
  index: number
  style?: React.CSSProperties
  data: Array<{
    userId: string
    result: boolean
    isActive: boolean
  }>
}

const ResponseGroupItem = memo(({ data, index, style }: ResponseGroupItemProps) => {
  const { userId, result, isActive } = data[index]

  return (
    <div style={style}>
      <motion.div
        layout
        layoutScroll
        key={`${index}`}
        css={responseGroupItemCss}
        id={`${index}`}
        className={isActive ? 'active' : ''}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{
          color: color.primaryText,
        }}
        whileTap={{
          scale: 0.9,
        }}
      >
        <span className="title" id={`${index}`}>
          {userId}
        </span>
        <span className={`status ${result ? 'success' : 'fail'}`} id={`${index}`}></span>
      </motion.div>
    </div>
  )
}, areEqual)

interface ResultTreeProps {
  APITestResponses: APITestResponse[]
}

export const ResultTree: FC<ResultTreeProps> = ({ APITestResponses }) => {
  const [showed, setShowed] = useState<false | number>(false)

  const [isInitialized, setIsInitialized] = useState(false)
  useEffect(() => {
    if (!isInitialized && APITestResponses.length > 0) {
      setShowed(0)
      setIsInitialized(true)
    }
  }, [APITestResponses, isInitialized])

  const onClickResponseGroupItem = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLElement && e.target.hasAttribute('id')) {
      const tIdx = parseInt(e.target.id) ?? 0
      setShowed(tIdx)
    }
  }, [])

  const responseGroupItems = useMemo(
    () =>
      APITestResponses.map((responseGroup, index) => ({
        userId: responseGroup.userId,
        result: responseGroup.result,
        isActive: showed !== false && showed === index,
      })),
    [APITestResponses, showed]
  )
  return (
    <>
      <motion.div css={responseGroupCss} onClick={onClickResponseGroupItem} layout layoutScroll>
        <AnimatePresence>
          <AutoSizer>
            {({ height, width }: { height: number; width: number }) => (
              <List
                itemCount={responseGroupItems.length}
                height={height}
                itemSize={48}
                width={width}
                itemData={responseGroupItems}
                css={overlayScrollBarYCss}
              >
                {ResponseGroupItem}
              </List>
            )}
          </AutoSizer>
        </AnimatePresence>
      </motion.div>
      <div css={responseListCss}>
        {showed !== false ? (
          <ErrorBoundary>
            <Blinker _key={`${showed}`}>
              <ResponseListViewer list={APITestResponses[showed]?.responseList as FetchApiResponse[]} />
            </Blinker>
          </ErrorBoundary>
        ) : null}
      </div>
    </>
  )
}

const responseGroupCss = css`
  width: 30%;
  height: 100%;
  padding: 0px 8px;
  border-right: 1px solid ${color.pale};
  // ${overlayScrollBarYCss};
`
const responseGroupItemCss = css`
  background: ${color.navBar};
  border: 1px solid ${color.pale};
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  margin-top: 8px;
  color: ${color.secondaryText};
  &.active {
    color: ${color.primaryText} !important;
    border: 1px solid ${color.secondaryText} !important;
  }
  & .status {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
  & .success {
    background-color: ${statusColor.GOOD};
  }
  & .fail {
    background-color: ${statusColor.FAIL};
  }
`

const responseListCss = css`
  position: relative;
  width: 70%;
  height: 100%;
  padding: 0px 8px;
  overflow: hidden;
`

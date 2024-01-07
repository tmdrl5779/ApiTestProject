import { ErrorBoundary, Loader } from '@/components'
import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { IAPI } from 'api-types'
import { FC, useMemo, useState } from 'react'
import {
  APIValuesContext,
  APIActionsContext,
  padding,
  UseAPIReturns,
  APIResponseViewer,
  APIRequestEditor,
} from '@/features/API'

interface APIDetailProps {
  idx: number
  api: IAPI
  updateAPI: UseAPIReturns['updateAPI']
}

// TODO: 재렌더링 줄이기 - memo활용
export const APIDetail: FC<APIDetailProps> = ({ idx, api, updateAPI }) => {
  const [isFetching, setIsFetching] = useState(false)
  const updateSingleAPI = useMemo(() => updateAPI(idx), [idx, updateAPI])

  return (
    <APIValuesContext.Provider value={{ api }}>
      <APIActionsContext.Provider value={{ updateSingleAPI }}>
        <div css={apiDetailMainCss}>
          <section css={reqSectionCss}>
            <ErrorBoundary>
              <APIRequestEditor api={api} idx={idx} updateAPI={updateAPI} setIsFetching={setIsFetching} />
            </ErrorBoundary>
          </section>
          <section css={resSectionCss}>
            <ErrorBoundary>
              <Loader isLoading={isFetching}>
                <APIResponseViewer response={api.response} />
              </Loader>
            </ErrorBoundary>
          </section>
        </div>
      </APIActionsContext.Provider>
    </APIValuesContext.Provider>
  )
}

const apiDetailMainCss = css`
  height: 100%;
  padding: ${padding.apiMain};
`
// TODO: Res, Req 높이 줄이고 늘이게 하기
const reqSectionCss = css`
  position: relative;
  overflow: hidden;
  height: 50%;
`
const resSectionCss = css`
  ${reqSectionCss}
  border-top: 1px solid ${color.pale};
`

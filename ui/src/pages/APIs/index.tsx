import { ChangeEvent, FormEvent, useCallback, useEffect, useReducer, useState } from 'react'
import { APIsContext } from './APIsContext'
import { getDefaultDatas, httpMethods, tabItems } from './data/constants'
import { ReqDataEditor } from './components/ReqDataEditor'
import { ReqDataTabs } from './components/ReqDataTabs'
import { Datas, HttpMethods, ReqData, ReqPayload, TabItem } from './types'
import { initialReqDatas, reqDataReducer } from './data/reqDataReducer'
import { useMutation } from 'react-query'
import { FetchApiRequest } from 'api-types'
import axios, { AxiosError } from 'axios'
import { convertDatasToObj } from './utils/convertDatasToObj'
import { fetchApi } from '@/remotes/fetchApi'
import { Funnel, Select, Input, Button } from '@/components'
import { makeFetchApiRequest } from '@/utils/makeFetchApiRequest'
import { css } from '@emotion/react'

// TODO: Funnel (O), Tab으로 컴포넌트 추상화 - 2
// TODO: 스타일링, 모션 = 3
// TODO: Body쪽 json, text 입력창도 만들기
export const APIs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabItems[0])
  const [method, setMethod] = useState<HttpMethods>(httpMethods[0])
  const [url, setUrl] = useState<string>('')
  const [datas, dispatchForDatas] = useReducer(reqDataReducer, initialReqDatas)

  const { data, mutate, isLoading, isError, error, isSuccess } = useMutation((request: FetchApiRequest) => {
    return fetchApi(request)
  })

  const onInputUrl = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setUrl(target.value)
  }, [])

  const onClickSend = useCallback(() => {
    const request = makeFetchApiRequest(
      url,
      method,
      convertDatasToObj(datas.Params.filter(e => e.included)),
      convertDatasToObj(datas.Headers.filter(e => e.included)),
      convertDatasToObj(datas.Body.filter(e => e.included))
    )
    mutate(request)
  }, [datas, method, mutate, url])

  const onSelectMethod = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement
    setMethod(target.value as HttpMethods)
  }, [])

  return (
    <APIsContext.Provider value={{ method, url, datas, dispatchForDatas }}>
      <section css={pannelCss}>
        <div className="resourceInput">
          <Select style={{ flex: '0 0 120px' }} onChange={onSelectMethod}>
            {httpMethods.map(method => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </Select>
          <Input style={{ flex: '1 1 auto' }} value={url} onChange={onInputUrl} />
          <Button className="sendBtn" onClick={onClickSend} style={{ flex: '0 0 80px' }} disabled={isLoading}>
            Send
          </Button>
        </div>
        <ReqDataTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <Funnel steps={tabItems.map(item => item.tabTitle)} step={selectedTab.tabTitle}>
          <Funnel.Step name="Params">
            <ReqDataEditor name="Params" />
          </Funnel.Step>
          <Funnel.Step name="Headers">
            <ReqDataEditor name="Headers" />
          </Funnel.Step>
          <Funnel.Step name="Body">
            <ReqDataEditor name="Body" />
          </Funnel.Step>
        </Funnel>
      </section>
      <section css={pannelCss}>
        {isLoading ? (
          '요청 중입니다...'
        ) : (
          <>
            {isError && <p>{(error as Error)?.message}</p>}
            {isSuccess && <p>{JSON.stringify(data, null, 4)}</p>}
          </>
        )}
      </section>
    </APIsContext.Provider>
  )
}

// TODO: 재렌더링 너무 잦음 최적화
// TODO: 마크업 게속~
const pannelCss = css`
  height: 50%;
  overflow-y: auto;
  .resourceInput {
    display: flex;
    height: 40px;
  }
`

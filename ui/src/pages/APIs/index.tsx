import { ChangeEvent, FormEvent, useCallback, useEffect, useReducer, useState } from 'react'
import { APIsContext } from './APIsContext'
import { getDefaultDatas, httpMethods, tabItems } from './data/constants'
import { ReqDataEditor } from './components/ReqDataEditor'
import { ReqDataTabs } from './components/ReqDataTabs'
import { Datas, HttpMethods, ReqData, ReqPayload, TabItem } from './types'
import { initialReqDatas, reqDataReducer } from './data/reqDataReducer'
import { Funnel } from '@/components/Funnel'
import { useMutation } from 'react-query'
import { convertDatasToObjStr } from './utils/convertDatasToObjStr'
import { getQueryString } from './utils/getQueryString'
import { getHeaderObj } from './utils/getHeaderObj'

// TODO: Funnel (O), Tab으로 컴포넌트 추상화 - 2
// TODO: 스타일링, 모션 = 3
// TODO: react query fetch 규격에 맞게 변경 + post 관련 데이터 어케 처리할지 고민 - 1
// TODO: Body쪽 json, text 입력창도 만들기
export const APIs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabItems[0])
  const [method, setMethod] = useState<HttpMethods>(httpMethods[0])
  const [url, setUrl] = useState<string>('')
  const [datas, dispatchForDatas] = useReducer(reqDataReducer, initialReqDatas)

  const { data, mutate, isLoading, isError, error, isSuccess } = useMutation(
    (metaData: { payload: ReqPayload; method: HttpMethods; url: string }) => {
      const { payload, method, url } = metaData
      return fetch(url + payload.Params, {
        method,
        body: method === 'GET' ? null : payload.Body,
        headers: payload.Headers,
      }).then(result => result)
    }
  )

  const onInputUrl = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setUrl(target.value)
  }, [])

  const onClickSend = useCallback(() => {
    console.log(method, url, datas)
    const payload = {
      Body: convertDatasToObjStr(datas.Body.filter(e => e.included)),
      Params: getQueryString(datas.Params.filter(e => e.included)),
      Headers: getHeaderObj(datas.Headers.filter(e => e.included)),
    }
    mutate({ method, url, payload })
  }, [datas, method, mutate, url])

  const onSelectMethod = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement
    setMethod(target.value as HttpMethods)
  }, [])

  return (
    <APIsContext.Provider value={{ method, url, datas, dispatchForDatas }}>
      <main>
        <section>
          <select onChange={onSelectMethod}>
            {httpMethods.map(method => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <input value={url} onChange={onInputUrl} />
          <button onClick={onClickSend}>Send</button>
        </section>
        <section>
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
        <section>
          <p>나는 응답창</p>
          {isLoading ? (
            '요청 중입니다...'
          ) : (
            <>
              {isError && <p>실패~</p>}
              {isSuccess && <p>성공~</p>}
            </>
          )}
        </section>
      </main>
    </APIsContext.Provider>
  )
}

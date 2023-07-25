import { ChangeEvent, FormEvent, useCallback, useEffect, useReducer, useState } from 'react'
import { APIsContext } from './APIsContext'
import { getDefaultDatas, httpMethods, tabItems } from './data/constants'
import { ReqDataEditor } from './components/ReqDataEditor'
import { ReqDataTabs } from './components/ReqDataTabs'
import { Datas, HttpMethods, ReqData, TabItem } from './types'
import { initialReqDatas, reqDataReducer } from './data/reqDataReducer'
import { Funnel } from '@/components/Funnel'
import { useMutation } from 'react-query'
import { convertDatsToObjStr } from './utils/convertDatasToObjStr'
import { getQueryString } from './utils/getQueryString'

// TODO: Funnel (O), Tab으로 컴포넌트 추상화 - 3
// TODO: 스타일링, 모션
// TODO: react Query로 fetch하기 - 2
// TODO: Body쪽 json, text 입력창도 만들기
// TODO: 체크 여부도 상태로 관리,,,,, typing 관련 에러 - 1
export const APIs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabItems[0])
  const [method, setMethod] = useState<HttpMethods>(httpMethods[0])
  const [url, setUrl] = useState<string>('')
  const [datas, dispatchForDatas] = useReducer(reqDataReducer, initialReqDatas)

  const mutation = useMutation((metaData: { datas: Datas; method: HttpMethods; url: string }) => {
    return fetch(metaData.url, {
      method,
      // body: datas.Body,
    }).then(result => result.json())
  })

  const onInputUrl = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setUrl(target.value)
  }, [])

  const onClickSend = useCallback(() => {
    console.log(method, url, datas)
    console.log(convertDatsToObjStr(datas.Body), convertDatsToObjStr(datas.Headers), getQueryString(datas.Params))
    mutation.mutate({ method, url, datas })
  }, [datas, method, mutation, url])

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
        <section></section>
      </main>
    </APIsContext.Provider>
  )
}

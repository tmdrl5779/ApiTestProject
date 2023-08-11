import { ChangeEvent, FormEvent, useCallback, useEffect, useReducer, useState } from 'react'
import { getDefaultDatas, httpMethods, tabItems } from '../../data/constants'
import { Datas, HttpMethods, ReqData, ReqPayload, TabItem } from '../../types'
import { initialReqDatas, reqDataReducer } from './reqDataReducer'
import { useMutation } from 'react-query'
import { FetchApiRequest } from 'api-types'
import { convertDatasToObj } from '../../utils/convertDatasToObj'
import { fetchApi } from '@/remotes/fetchApi'
import { Funnel, Select, Input, Button, Tabs, Blinker } from '@/components'
import { makeFetchApiRequest } from '@/utils'
import { css } from '@emotion/react'
import { color } from '@/data/variables.style'
import { DataTable } from './DataTable'
import { ReqDataEditorContext } from './ReqDataEditorContext'

// TODO: Body쪽 json, text 입력창도 만들기
export const ReqDataEditor: React.FC = () => {
  const [selectedTabCode, setSelectedTabCode] = useState(tabItems[0].code)
  const [method, setMethod] = useState<HttpMethods>(httpMethods[0])
  const [url, setUrl] = useState<string>('')
  const [datas, dispatchForDatas] = useReducer(reqDataReducer, initialReqDatas)

  const onSelectTab = useCallback((code: string) => {
    setSelectedTabCode(code)
  }, [])

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
    <ReqDataEditorContext.Provider value={{ method, url, datas, dispatchForDatas }}>
      <section css={pannelCss}>
        <div className="resourceInput">
          <Select style={{ flex: '0 0 120px' }} onChange={onSelectMethod}>
            {httpMethods.map(method => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </Select>
          <Input style={{ flex: '1 1 auto', padding: '0 12px' }} value={url} onChange={onInputUrl} />
          <Button
            className="sendBtn"
            onClick={onClickSend}
            style={{ flex: '0 0 80px', marginLeft: '8px' }}
            disabled={isLoading}
            loading={true}
          >
            Send
          </Button>
        </div>
        <Tabs items={tabItems} onSelect={onSelectTab} background={color.background} />
        <Blinker _key={selectedTabCode}>
          <Funnel steps={tabItems.map(item => item.code)} step={selectedTabCode}>
            <Funnel.Step name="Params">
              <DataTable name="Params" />
            </Funnel.Step>
            <Funnel.Step name="Headers">
              <DataTable name="Headers" />
            </Funnel.Step>
            <Funnel.Step name="Body">
              <DataTable name="Body" />
            </Funnel.Step>
          </Funnel>
        </Blinker>
      </section>
    </ReqDataEditorContext.Provider>
  )
}

// TODO: 재렌더링 너무 잦음 최적화
const pannelCss = css`
  height: 50%;
  overflow-y: auto;
  .resourceInput {
    display: flex;
    height: 40px;
  }
`

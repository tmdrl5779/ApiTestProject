import { ChangeEvent, FormEvent, useCallback, useEffect, useReducer, useState } from 'react'
import { APIsContext } from './APIsContext'
import { getDefaultDatas, httpMethods, tabItems } from './data/constants'
import { ReqDataEditor } from './components/ReqDataEditor'
import { Datas, HttpMethods, ReqData, ReqPayload, TabItem } from './types'
import { initialReqDatas, reqDataReducer } from './components/ReqDataEditor/reqDataReducer'
import { useMutation } from 'react-query'
import { FetchApiRequest } from 'api-types'
import axios, { AxiosError } from 'axios'
import { convertDatasToObj } from './utils/convertDatasToObj'
import { fetchApi } from '@/remotes/fetchApi'
import { Funnel, Select, Input, Button, Tabs, Blinker } from '@/components'
import { makeFetchApiRequest } from '@/utils'
import { css } from '@emotion/react'
import { color } from '@/data/variables.style'

// TODO: Body쪽 json, text 입력창도 만들기
export const APIs: React.FC = () => {
  const [selectedTabCode, setSelectedTabCode] = useState(tabItems[0].code)

  const onSelectTab = useCallback((code: string) => {
    setSelectedTabCode(code)
  }, [])

  return (
    <section css={pannelCss}>
      <Tabs items={tabItems} onSelect={onSelectTab} background={color.background} type="card" tabPosition="top" />
      {/* <Blinker _key={selectedTabCode}>
        <Funnel steps={tabItems.map(item => item.code)} step={selectedTabCode}>
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
      </Blinker> */}
    </section>
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

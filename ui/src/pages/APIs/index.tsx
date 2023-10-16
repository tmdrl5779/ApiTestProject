import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { getDefaultDatas, httpMethods, tabItems } from './data/constants'
import { Funnel, Select, Input, Button, Tabs, Blinker } from '@/components'
import { css } from '@emotion/react'
import { color } from '@/data/variables.style'
import { useAPIList } from '@/hooks'
import { genearteUUID } from '@/utils'

// TODO: Body쪽 json, text 입력창도 만들기
export const APIs: React.FC = () => {
  const { APIList, createAPI, deleteAPI, updateAPI } = useAPIList()
  const [selectedTabCode, setSelectedTabCode] = useState(APIList[0]?.uuid)

  useEffect(() => {
    console.log(selectedTabCode)
  }, [selectedTabCode])

  const APITabItems = useMemo(
    () =>
      APIList.map(API => ({
        title: `${API.request.httpMethod} ${API.request.url === '' ? 'Untitled Request' : API.request.url}`,
        code: API.uuid,
      })),
    [APIList]
  )

  const onDeleteTab = useCallback(
    (idx: number) => {
      if (APITabItems[idx].code === selectedTabCode) {
        // 맨 첨 친구면 그 담 친구
        // 아니면 그 뒤 친구
        console.log('선택댄애 지움!')
        if (idx === 0 && APITabItems[idx + 1]?.code !== undefined) {
          setSelectedTabCode(APITabItems[idx + 1].code)
        }
        if (idx !== 0 && APITabItems[idx - 1]?.code !== undefined) {
          setSelectedTabCode(APITabItems[idx - 1].code)
        }
      }
      deleteAPI(idx)
    },
    [APITabItems, deleteAPI, selectedTabCode]
  )

  const onSelectTab = useCallback((code: string) => {
    setSelectedTabCode(code)
  }, [])

  return (
    <section css={pannelCss}>
      <Tabs
        items={APITabItems}
        selectedCode={selectedTabCode}
        onSelect={onSelectTab}
        onAdd={createAPI}
        onDelete={onDeleteTab}
        background={color.background}
        type="card"
        tabPosition="top"
        editable
      />
      <Blinker _key={selectedTabCode}>
        <Funnel steps={tabItems.map(item => item.code)} step={selectedTabCode}>
          <Funnel.Step name="Params">Params</Funnel.Step>
          <Funnel.Step name="Headers">Headers</Funnel.Step>
          <Funnel.Step name="Body">Body</Funnel.Step>
        </Funnel>
      </Blinker>
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

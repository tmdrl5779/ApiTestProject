import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { getDefaultDatas, httpMethods } from './data/constants'
import { Funnel, Select, Input, Button, Tabs, Blinker } from '@/components'
import { css } from '@emotion/react'
import { color } from '@/data/variables.style'
import { useAPIList } from '@/hooks'
import { genearteUUID } from '@/utils'
import { APIDetail } from './components/APIDetail'

// TODO: Body쪽 json, text 입력창도 만들기
export const APIs: React.FC = () => {
  const { APIList, createAPI, deleteAPI, updateAPI } = useAPIList()
  const [selectedTabCode, setSelectedTabCode] = useState(APIList[0]?.uuid)

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
    <>
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
      <Blinker _key={selectedTabCode} style={{ height: 'calc(100% - 40px)' }}>
        <Funnel steps={APITabItems.map(item => item.code)} step={selectedTabCode}>
          {APIList.map((API, idx) => (
            <Funnel.Step key={API.uuid} name={API.uuid}>
              {<APIDetail api={API} updateAPI={updateAPI(idx)} />}
            </Funnel.Step>
          ))}
        </Funnel>
      </Blinker>
    </>
  )
}

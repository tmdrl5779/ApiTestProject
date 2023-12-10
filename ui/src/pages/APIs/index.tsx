import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { getDefaultDatas, httpMethods } from './data/constants'
import { Funnel, Select, Input, Button, Tabs, Blinker } from '@/components'
import { css } from '@emotion/react'
import { color, methodColor } from '@/data/variables.style'
import { useAPIList } from '@/hooks'
import { genearteUUID } from '@/utils'
import { APIDetail } from './components/APIDetail'
import { IAPI } from 'api-types'

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

  const renderAPITabTitle = useCallback((title: string) => {
    const [httpMethod, ...rest] = title.split(' ')
    const url = rest.join(' ')
    return (
      <span>
        <span style={{ color: `${methodColor[httpMethod]}` }}>{httpMethod}</span>{' '}
        {url === '' ? 'Untitled Request' : url}
      </span>
    )
  }, [])

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
        renderTabTitle={renderAPITabTitle}
      />
      <Blinker _key={selectedTabCode} style={{ height: 'calc(100% - 40px)' }}>
        <Funnel steps={APITabItems.map(item => item.code)} step={selectedTabCode}>
          {APIList.map((API, idx) => (
            <Funnel.Step key={API.uuid} name={API.uuid}>
              {<APIDetail api={API} idx={idx} updateAPI={updateAPI} />}
            </Funnel.Step>
          ))}
        </Funnel>
      </Blinker>
    </>
  )
}

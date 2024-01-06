import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { getDefaultDatas, httpMethods } from './data/constants'
import { Funnel, Select, Input, Button, Tabs, Blinker } from '@/components'
import { css } from '@emotion/react'
import { color, methodColor } from '@/data/variables.style'
import { useAPIList } from '@/hooks'
import { genearteUUID } from '@/utils'
import { APIDetail } from './components/APIDetail'
import { IAPI } from 'api-types'
import { height } from './rect'

const renderAPITabTitle = (title: string) => {
  const [httpMethod, ...rest] = title.split(' ')
  const url = rest.join(' ')
  return (
    <span>
      <span style={{ color: `${methodColor[httpMethod]}` }}>{httpMethod}</span> {url === '' ? 'Untitled Request' : url}
    </span>
  )
}

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
    <div css={apiMainCss}>
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
      <div css={apiContentCss}>
        <Blinker _key={selectedTabCode}>
          <Funnel step={selectedTabCode}>
            {APIList.map((API, idx) => (
              <Funnel.Step key={API.uuid} name={API.uuid}>
                {<APIDetail api={API} idx={idx} updateAPI={updateAPI} />}
              </Funnel.Step>
            ))}
          </Funnel>
        </Blinker>
      </div>
    </div>
  )
}

const apiMainCss = css`
  height: 100%;
`

const apiContentCss = css`
  height: calc(100% - ${height.apiTabs});
`

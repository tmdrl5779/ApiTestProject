import { Input, Tabs, TabsItem } from '@/components'
import { getDefaultPayloadItem } from '@/data/constants'
import { color, overlayScrollBarYCss } from '@/data/variables.style'
import { UseAPIReturns } from '@/hooks'
import { css } from '@emotion/react'
import { IAPI } from 'api-types'
import { PayloadItem } from 'common-types'
import { motion } from 'framer-motion'
import { Draft } from 'immer'
import { ChangeEventHandler, FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { tableHeaders } from '../data/constants'
import { PayloadType, PayloadKeys } from '../types'

export const reqTabItems: Array<TabsItem & { key: PayloadType }> = [
  { title: 'Params', code: 'Params', key: 'param' },
  { title: 'Headers', code: 'Headers', key: 'header' },
  { title: 'Body', code: 'Body', key: 'body' },
]

interface APIPayloadEditorProps {
  updateAPI: ReturnType<UseAPIReturns['updateAPI']>
  api: IAPI
}

// TODO: table 따로 component로 빼서 사용
export const APIPayloadEditor: FC<APIPayloadEditorProps> = ({ updateAPI, api }) => {
  const [selectedReqTab, setSelectedReqTab] = useState(reqTabItems[0])

  const onSelectTab = useCallback((code: string) => {
    setSelectedReqTab(reqTabItems.find(item => item.code === code) as TabsItem & { key: PayloadType })
  }, [])

  const onChangeCell = useCallback(
    (type: PayloadType, idx: number) => (key: PayloadKeys, value: string) => {
      updateAPI({
        type,
        idx,
        key,
        value,
        _tag: 'UpdatePayloadAction',
      })
    },
    [updateAPI]
  )

  const payloadType = useMemo(() => selectedReqTab.key as PayloadType, [selectedReqTab])

  const payloadArrLen = api['request'][payloadType].length

  const onChangeCells = useMemo(
    () => new Array(payloadArrLen).fill('_').map((_, idx) => onChangeCell(payloadType, idx)),
    [payloadArrLen, onChangeCell, payloadType]
  )

  return (
    <>
      <Tabs
        items={reqTabItems}
        selectedCode={selectedReqTab.code}
        onSelect={onSelectTab}
        background={color.background}
        type="line"
        tabPosition="top"
      />
      <Header />
      <motion.ul css={tableCss} layout key="API-payload-editor">
        {api['request'][payloadType].map((_, idx) => (
          <Row key={idx} onChangeCell={onChangeCells[idx]} data={api['request'][payloadType][idx]} />
        ))}
      </motion.ul>
    </>
  )
}

const Header = memo(() => {
  return (
    <motion.li css={[rowCss, headerCss]}>
      {tableHeaders.map(header => (
        <motion.div className={`cell ${header}`} key={header}>
          {header === 'included' ? '' : header.toUpperCase()}
        </motion.div>
      ))}
    </motion.li>
  )
})

const Row = memo(
  ({ onChangeCell, data }: { onChangeCell: (key: PayloadKeys, value: string) => void; data: PayloadItem }) => {
    const _onChangeCell: (key: PayloadKeys) => ChangeEventHandler = useCallback(
      key => e => {
        const target = e.target as HTMLInputElement
        onChangeCell(key, target.value)
      },
      [onChangeCell]
    )
    return (
      <motion.li css={rowCss}>
        {tableHeaders.map(header => (
          <Cell key={header} header={header} data={data[header]} _onChangeCell={_onChangeCell} />
        ))}
      </motion.li>
    )
  }
)

// TODO: prop drillling 뵈기 싫다..
const Cell = memo(
  ({
    header,
    _onChangeCell,
    data,
  }: {
    header: PayloadKeys
    _onChangeCell: (key: PayloadKeys) => ChangeEventHandler
    data: string | boolean
  }) => {
    const onChangeCell = useMemo(() => _onChangeCell(header), [_onChangeCell, header])

    return (
      <motion.div className={`cell ${header}`} key={header}>
        {
          <Input
            onChange={onChangeCell}
            checked={header === 'included' ? (data as boolean) : undefined}
            value={header === 'included' ? undefined : (data as string)}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            type={header === 'included' ? 'checkbox' : 'text'}
          />
        }
      </motion.div>
    )
  }
)

//TODO: 하드코딩으로 높이 계산 ㄴㄴ flex auto grid 이런걸로 바꾸기
const tableCss = css`
  width: calc(100% + 8px);
  height: calc(100% - 40px - 52px - 8px - 40px);
  min-height: calc(100% - 40px - 52px - 8px - 40px);
  max-height: calc(100% - 40px - 52px - 8px - 40px);
  margin: 0;
  padding: 0;

  // 스크롤바 overlay 세팅
  ${overlayScrollBarYCss};
`

const headerCss = css`
  font-weight: bold;
  margin-top: 8px;
`

const rowCss = css`
  display: flex;
  list-style: none;
  justify-items: stretch;
  & :first-child {
    border-left: none;
  }
  & :last-child {
    border-right: none;
  }

  .cell {
    display: flex;
    align-items: center;
    border: 1px solid ${color.topGradient};
    padding: 4px 8px;
    height: 40px;
    &.included {
      width: 40px;
    }
    &.key {
      width: 20%;
    }
    &.value {
      width: 30%;
    }
    &.description {
      width: calc(50% - 40px);
    }
  }
`

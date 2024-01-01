import { Blinker, Input, Tabs, TabsItem, WrappedChangeEventHandler } from '@/components'
import { getDefaultPayloadItem } from '@/data/constants'
import { color, overlayScrollBarYCss } from '@/data/variables.style'
import { parseStr2Json } from '@/utils'
import { UseAPIReturns } from '@/hooks'
import { css } from '@emotion/react'
import { IAPI } from 'api-types'
import { PayloadItem } from 'common-types'
import { motion } from 'framer-motion'
import { Draft } from 'immer'
import { ChangeEventHandler, FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { tableHeaders } from '../data/constants'
import { PayloadType, PayloadKeys } from '../types'
import Ajv from 'ajv'
import Editor from '@monaco-editor/react'

const ajv = new Ajv({ allErrors: true, verbose: true })

export const reqTabItems: Array<TabsItem & { key: PayloadType }> = [
  { title: 'Params', code: 'Params', key: 'param' },
  { title: 'Headers', code: 'Headers', key: 'header' },
  { title: 'Body', code: 'Body', key: 'body' },
]

interface APIPayloadEditorProps {
  updateAPI: ReturnType<UseAPIReturns['updateAPI']>
  api: IAPI
}

export const APIPayloadEditor: FC<APIPayloadEditorProps> = ({ updateAPI, api }) => {
  const [selectedReqTab, setSelectedReqTab] = useState(reqTabItems[0])

  const onSelectTab = useCallback((code: string) => {
    setSelectedReqTab(reqTabItems.find(item => item.code === code) as TabsItem & { key: PayloadType })
  }, [])

  const onChangeCell = useCallback(
    (type: Exclude<PayloadType, 'body'>, idx: number) => (key: PayloadKeys, value: string) => {
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

  const payloadArrLen = payloadType === 'body' ? 0 : api['request'][payloadType].length

  const onChangeCells = useMemo(
    () =>
      new Array(payloadArrLen)
        .fill('_')
        .map((_, idx) => (payloadType === 'body' ? () => {} : onChangeCell(payloadType, idx))),
    [payloadArrLen, onChangeCell, payloadType]
  )

  const onChangeBody = useCallback(
    (value: string | undefined) => {
      updateAPI({
        value: value ?? '',
        _tag: 'UpdateBodyAction',
      })
    },
    [updateAPI]
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
      <Blinker _key={selectedReqTab.code} _css={[tableCss, bodyEditorWrapperCss]}>
        {payloadType === 'body' ? (
          <Editor
            height="100%"
            theme="vs-dark"
            language="json"
            defaultLanguage="json"
            defaultValue={api['request'].body}
            onChange={onChangeBody}
            loading={<></>}
          />
        ) : (
          <>
            <Header />
            <motion.ul css={tableCss} layout key="API-payload-editor">
              {api['request'][payloadType].map((_, idx) => (
                <Row key={idx} onChangeCell={onChangeCells[idx]} data={api['request'][payloadType][idx]} />
              ))}
            </motion.ul>
          </>
        )}
      </Blinker>
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
    const _onChangeCell: (key: PayloadKeys) => WrappedChangeEventHandler = useCallback(
      key => value => {
        onChangeCell(key, value)
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
    _onChangeCell: (key: PayloadKeys) => WrappedChangeEventHandler
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

const bodyEditorWrapperCss = css`
  height: calc(100% - 40px - 8px - 40px);
  min-height: calc(100% - 40px - 8px - 40px);
  max-height: calc(100% - 40px - 8px - 40px);
`

//TODO: 하드코딩으로 높이 계산 ㄴㄴ flex auto grid 이런걸로 바꾸기
const tableCss = css`
  width: calc(100%);
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
  width: calc(100% - 6px);
`

const rowCss = css`
  display: flex;
  list-style: none;
  justify-items: stretch;
  & :first-of-type {
    border-left: none;
  }
  & :last-of-type {
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

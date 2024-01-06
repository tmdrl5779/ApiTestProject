import { Blinker, Tabs, TabsItem } from '@/components'
import { color, overlayScrollBarYCss } from '@/data/variables.style'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { FC, useCallback, useMemo, useState } from 'react'
import { PayloadType, PayloadKeys } from '../../types'
import Editor from '@monaco-editor/react'
import { useAPIContext } from '../../APIContext'
import { Row } from './Row'
import { Header } from './Header'
import { height, padding } from '../../data/rect'

export const reqTabItems: Array<TabsItem & { key: PayloadType }> = [
  { title: 'Params', code: 'Params', key: 'param' },
  { title: 'Headers', code: 'Headers', key: 'header' },
  { title: 'Body', code: 'Body', key: 'body' },
]

export const APIPayloadEditor: FC = () => {
  const { api, updateSingleAPI } = useAPIContext()

  const [selectedReqTab, setSelectedReqTab] = useState(reqTabItems[0])

  const onSelectTab = useCallback((code: string) => {
    setSelectedReqTab(reqTabItems.find(item => item.code === code) as TabsItem & { key: PayloadType })
  }, [])

  const onChangeCell = useCallback(
    (type: Exclude<PayloadType, 'body'>, idx: number) => (key: PayloadKeys, value: string) => {
      updateSingleAPI({
        type,
        idx,
        key,
        value,
        _tag: 'UpdatePayloadAction',
      })
    },
    [updateSingleAPI]
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
      updateSingleAPI({
        value: value ?? '',
        _tag: 'UpdateBodyAction',
      })
    },
    [updateSingleAPI]
  )

  return (
    <div css={payloadEditorWrapperCss}>
      <Tabs
        items={reqTabItems}
        selectedCode={selectedReqTab.code}
        onSelect={onSelectTab}
        background={color.background}
        type="line"
        tabPosition="top"
      />
      <Blinker _key={selectedReqTab.code}>
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
    </div>
  )
}

const payloadEditorWrapperHeight = `calc(100% - ${height.controller} - ${padding.apiMain} - ${height.payloadTabs})`

const payloadEditorWrapperCss = css`
  height: ${payloadEditorWrapperHeight};
  min-height: ${payloadEditorWrapperHeight};
  max-height: ${payloadEditorWrapperHeight};
`

const tableHeight = `calc(100% - ${height.payloadTabs})`

const tableCss = css`
  width: 100%;
  height: ${tableHeight};
  min-height: ${tableHeight};
  max-height: ${tableHeight};
  margin: 0;
  padding: 0;

  // 스크롤바 overlay 세팅
  ${overlayScrollBarYCss};
`

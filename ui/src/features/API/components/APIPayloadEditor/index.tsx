import { Blinker, Funnel, Tabs, TabsItem } from '@/components'
import { color, overlayScrollBarYCss } from '@/data/variables.style'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { FC, useCallback, useMemo, useState } from 'react'
import { PayloadType, PayloadKeys, PayloadTypeUsingTableEditor, isPayloadTypeUsingTableEditor } from '../../types'
import { useAPIContext } from '../../APIContext'
import { Row } from './TableEditor/Row'
import { Header } from './TableEditor/Header'
import { height, padding } from '../../data/rect'
import { TimeEditor } from './TimeEditor'
import { TableEditor } from './TableEditor'
import { BodyEditor } from './BodyEditor'

export const reqTabItems: Array<TabsItem & { key: PayloadType }> = [
  { title: 'Params', code: 'Params', key: 'param' },
  { title: 'Headers', code: 'Headers', key: 'header' },
  { title: 'Body', code: 'Body', key: 'body' },
  { title: 'Time', code: 'Time', key: 'time' },
]

const payloadTypesUsingTableEditor: PayloadTypeUsingTableEditor[] = ['param', 'header']

export const APIPayloadEditor: FC = () => {
  const { api, updateSingleAPI } = useAPIContext()

  const [selectedReqTab, setSelectedReqTab] = useState(reqTabItems[0])
  const payloadType = useMemo(() => selectedReqTab.key as PayloadType, [selectedReqTab])

  const onSelectTab = useCallback((code: string) => {
    setSelectedReqTab(reqTabItems.find(item => item.code === code) as TabsItem & { key: PayloadType })
  }, [])

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
        <Funnel step={payloadType}>
          <Funnel.Step key="time" name="time">
            <TimeEditor />
          </Funnel.Step>
          <Funnel.Step key="body" name="body">
            <BodyEditor />
          </Funnel.Step>
          {payloadTypesUsingTableEditor.map(payloadTypeUsingTableEditor => (
            <Funnel.Step key={payloadTypeUsingTableEditor} name={payloadTypeUsingTableEditor}>
              <TableEditor payloadType={payloadTypeUsingTableEditor} />
            </Funnel.Step>
          ))}
        </Funnel>
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

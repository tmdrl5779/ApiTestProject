import { overlayScrollBarYCss } from '@/data/variables.style'
import { isPayloadTypeUsingTableEditor, PayloadKeys, PayloadTypeUsingTableEditor, useAPIContext } from '@/features/API'
import { height } from '../../../data/rect'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { FC, useCallback, useMemo } from 'react'
import { Header } from './Header'
import { Row } from './Row'

interface TableEditorProps {
  payloadType: PayloadTypeUsingTableEditor
}

export const TableEditor: FC<TableEditorProps> = ({ payloadType }) => {
  const { api, updateSingleAPI } = useAPIContext()
  const payloadArrLen = isPayloadTypeUsingTableEditor(payloadType) ? api['request'][payloadType].length : 0

  const onChangeCell = useCallback(
    (type: PayloadTypeUsingTableEditor, idx: number) => (key: PayloadKeys, value: string) => {
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

  const onChangeCells = useMemo(
    () =>
      new Array(payloadArrLen)
        .fill('_')
        .map((_, idx) => (isPayloadTypeUsingTableEditor(payloadType) ? onChangeCell(payloadType, idx) : () => {})),
    [payloadArrLen, onChangeCell, payloadType]
  )
  return (
    <>
      <Header />
      <motion.ul css={tableCss} layout key="API-payload-editor">
        {api['request'][payloadType].map((_, idx) => (
          <Row key={idx} onChangeCell={onChangeCells[idx]} data={api['request'][payloadType][idx]} />
        ))}
      </motion.ul>
    </>
  )
}

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

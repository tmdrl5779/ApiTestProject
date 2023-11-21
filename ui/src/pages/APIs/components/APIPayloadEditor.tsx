import { Input, Tabs, TabsItem } from '@/components'
import { getDefaultPayloadItem } from '@/data/constants'
import { color, overlayScrollBarCss } from '@/data/variables.style'
import { css } from '@emotion/react'
import { IAPI } from 'api-types'
import { PayloadItem } from 'common-types'
import { motion } from 'framer-motion'
import { Draft } from 'immer'
import { ChangeEventHandler, FC, useCallback, useMemo, useState } from 'react'

type PayloadType = 'param' | 'header' | 'body'

export const reqTabItems: Array<TabsItem & { key: PayloadType }> = [
  { title: 'Params', code: 'Params', key: 'param' },
  { title: 'Headers', code: 'Headers', key: 'header' },
  { title: 'Body', code: 'Body', key: 'body' },
]

const tableHeaders = ['included', 'key', 'value', 'description'] as const

interface APIPayloadEditorProps {
  updateAPIImmutable: (recipe: (draft: Draft<IAPI>) => void) => void
  api: IAPI
}

// TODO: table 따로 component로 빼서 사용
export const APIPayloadEditor: FC<APIPayloadEditorProps> = ({ updateAPIImmutable, api }) => {
  const [selectedReqTab, setSelectedReqTab] = useState(reqTabItems[0])

  const onSelectTab = useCallback((code: string) => {
    setSelectedReqTab(reqTabItems.find(item => item.code === code) as TabsItem & { key: PayloadType })
  }, [])

  const onChangeCell = useCallback(
    (type: (typeof reqTabItems)[number]['key'], idx: number) => (key: (typeof tableHeaders)[number], value: string) => {
      if (key === 'included') {
        updateAPIImmutable(draft => {
          draft['request'][type][idx]['included'] = !draft['request'][type][idx]['included']
        })
      } else {
        updateAPIImmutable(draft => {
          draft['request'][type][idx][key] = value
          if (draft['request'][type][idx + 1] === undefined) {
            draft['request'][type].push(getDefaultPayloadItem())
          }
        })
      }
    },
    [updateAPIImmutable]
  )

  const payloadType = useMemo(() => selectedReqTab.key as PayloadType, [selectedReqTab])

  console.log(api['request'])
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
          <Row key={idx} onChangeCell={onChangeCell(payloadType, idx)} data={api['request'][payloadType][idx]} />
        ))}
      </motion.ul>
    </>
  )
}

const Header = () => {
  return (
    <motion.li css={[rowCss, headerCss]}>
      {tableHeaders.map(header => (
        <motion.div className={`cell ${header}`} key={header}>
          {header === 'included' ? '' : header.toUpperCase()}
        </motion.div>
      ))}
    </motion.li>
  )
}

const Row = ({
  onChangeCell,
  data,
}: {
  onChangeCell: (key: (typeof tableHeaders)[number], value: string) => void
  data: PayloadItem
}) => {
  const _onChangeCell: (key: (typeof tableHeaders)[number]) => ChangeEventHandler = useCallback(
    key => e => {
      const target = e.target as HTMLInputElement
      onChangeCell(key, target.value)
    },
    [onChangeCell]
  )

  return (
    <motion.li css={rowCss}>
      {tableHeaders.map(header => (
        <motion.div className={`cell ${header}`} key={header}>
          {
            <Input
              onChange={_onChangeCell(header)}
              checked={header === 'included' ? data[header] : undefined}
              value={header === 'included' ? undefined : data[header]}
              style={{ width: '100%', height: '100%', background: 'transparent' }}
              type={header === 'included' ? 'checkbox' : 'text'}
            />
          }
        </motion.div>
      ))}
    </motion.li>
  )
}

//TODO: 하드코딩으로 높이 계산 ㄴㄴ flex auto grid 이런걸로 바꾸기
const tableCss = css`
  width: calc(100% + 8px);
  height: calc(100% - 40px - 52px - 8px - 40px);
  min-height: calc(100% - 40px - 52px - 8px - 40px);
  max-height: calc(100% - 40px - 52px - 8px - 40px);
  margin: 0;
  padding: 0;

  // 스크롤바 overlay 세팅
  ${overlayScrollBarCss};
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

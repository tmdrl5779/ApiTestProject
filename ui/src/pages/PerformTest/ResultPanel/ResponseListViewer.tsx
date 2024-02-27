import { Blinker, Tabs } from '@/components'
import { color } from '@/data/variables.style'
import { APIResponseViewer, renderResponseTabTitle } from '@/features/API'
import { css } from '@emotion/react'
import { FetchApiResponse } from 'api-types'
import { FC, useCallback, useMemo, useState } from 'react'

export interface ResponseListViewerProps {
  list: FetchApiResponse[]
}

export const ResponseListViewer: FC<ResponseListViewerProps> = ({ list }) => {
  const [selectedCode, setSelectedCode] = useState<string>('0')

  const onSelect = useCallback((code: string) => {
    setSelectedCode(code)
  }, [])

  const tabsItems = useMemo(
    () =>
      list.map((response, rIdx) => ({
        title: `${response.httpMethod} ${response.url} ${response.status}`,
        code: `${rIdx}`,
      })),
    [list]
  )

  return (
    <>
      <Tabs
        items={tabsItems}
        selectedCode={selectedCode}
        onSelect={onSelect}
        background={color.background}
        type="card"
        tabPosition="top"
        _css={responseTabCss}
        renderTabTitle={renderResponseTabTitle}
      />
      <Blinker _key={selectedCode} _css={blinkerOverrideCss}>
        <APIResponseViewer response={list[Number(selectedCode)] as FetchApiResponse} />
      </Blinker>
    </>
  )
}

const blinkerOverrideCss = css`
  height: calc(100% - 40px);
  color: inherit;
`

const responseTabCss = css`
  border-bottom: 1px solid ${color.pale};
`

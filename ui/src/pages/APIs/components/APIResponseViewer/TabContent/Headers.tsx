import { Table } from '@/components'
import { overlayScrollBarYCss } from '@/data/variables.style'
import { useObjectEntries } from '@/hooks'
import { DataForResponseViewer } from '@/pages/APIs/types'
import { css } from '@emotion/react'
import { FC } from 'react'
import { tableWrapperScrollableCss } from './tableWrapperScrollableCss'

interface HeadersProps {
  headers: DataForResponseViewer['headers'] | null
}

export const Headers: FC<HeadersProps> = ({ headers }) => {
  const headersArr = useObjectEntries(headers)
  if (headers === null) {
    return <span>헤더가 없어..</span>
  }
  return (
    <div css={tableWrapperScrollableCss}>
      <Table columns={['KEY', 'VALUE']} data={headersArr} />
    </div>
  )
}

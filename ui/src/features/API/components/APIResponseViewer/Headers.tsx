import { Error, Info, Table } from '@/components'
import { overlayScrollBarYCss } from '@/data/variables.style'
import { useObjectEntries } from '@/hooks'
import { css } from '@emotion/react'
import { FetchApiResponse } from 'api-types'
import { FC } from 'react'
import { tableWrapperScrollableCss } from './tableWrapperScrollableCss'

interface HeadersProps {
  headers: FetchApiResponse['headers'] | null
}

export const Headers: FC<HeadersProps> = ({ headers }) => {
  const headersArr = useObjectEntries(headers)
  if (headers === null) {
    return <Info message={'Header가 없습니다.'} />
  }
  return (
    <div css={tableWrapperScrollableCss}>
      <Table columns={['KEY', 'VALUE']} data={headersArr} />
    </div>
  )
}

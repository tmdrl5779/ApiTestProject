import { Error, Info, Table } from '@/components'
import { useObjectEntries } from '@/hooks'
import { FetchApiResponse } from 'api-types'
import { FC, useMemo } from 'react'
import { tableWrapperScrollableCss } from './tableWrapperScrollableCss'

interface CookiesProps {
  cookies: FetchApiResponse['cookies'] | null
}

export const Cookies: FC<CookiesProps> = ({ cookies }) => {
  const cookiesArr = useObjectEntries(cookies)
  if (cookies === null) {
    return <Info message={'Cookie가 없습니다.'} />
  }
  return (
    <div css={tableWrapperScrollableCss}>
      <Table columns={['KEY', 'VALUE']} data={cookiesArr} />
    </div>
  )
}

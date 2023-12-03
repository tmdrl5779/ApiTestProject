import { Table } from '@/components'
import { useObjectEntries } from '@/hooks'
import { DataForResponseViewer } from '@/pages/APIs/types'
import { FC, useMemo } from 'react'
import { tableWrapperScrollableCss } from './tableWrapperScrollableCss'

interface CookiesProps {
  cookies: DataForResponseViewer['cookies'] | null
}

export const Cookies: FC<CookiesProps> = ({ cookies }) => {
  const cookiesArr = useObjectEntries(cookies)
  if (cookies === null) {
    return <span>쿠키가 없어..</span>
  }
  return (
    <div css={tableWrapperScrollableCss}>
      <Table columns={['KEY', 'VALUE']} data={cookiesArr} />
    </div>
  )
}

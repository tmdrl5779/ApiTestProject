import { methodColor, statusColor } from '@/data/variables.style'
import { useMemo } from 'react'
import { getStatusColor } from './getStatusColor'

export const renderResponseTabTitle = (title: string) => {
  const [httpMethod, url, status] = title.split(' ')
  const urlSubstr = url.substr(0, url.lastIndexOf('/'))
  return (
    <span>
      <span style={{ color: `${methodColor[httpMethod]}`, marginRight: '4px' }}>{httpMethod}</span>{' '}
      {url === '' ? 'Untitled Request' : urlSubstr}...
      <span style={{ color: `${getStatusColor(status)}`, marginLeft: '4px' }}>{status}</span>
    </span>
  )
}

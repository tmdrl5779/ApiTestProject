import { methodColor } from '@/data/variables.style'

export const renderAPITabTitle = (title: string) => {
  const [httpMethod, ...rest] = title.split(' ')
  const url = rest.join(' ')
  return (
    <span>
      <span style={{ color: `${methodColor[httpMethod]}` }}>{httpMethod}</span> {url === '' ? 'Untitled Request' : url}
    </span>
  )
}

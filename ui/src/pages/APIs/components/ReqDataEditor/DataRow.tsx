import { capitalize } from '@/utils/capitalize'
import { getObjectKeys } from '@/utils/ObjectHandler'
import { useCallback, useState } from 'react'
import { ReqData } from '../../types'
import { inputCss, rowDeleteBtnCss, tableCellCss, tableRowCss } from './styles'

export const DataRow = ({
  data,
  idx,
  onDataInputChange,
  deleteData,
}: {
  data: ReqData
  idx: number
  onDataInputChange: (idx: number, key: keyof ReqData, value: string | boolean) => void
  deleteData: (idx: number) => void
}) => {
  const [deletable, setDeletable] = useState(false)

  const onMouseEnter = useCallback(() => {
    if (idx === 0) {
      return
    }
    setDeletable(true)
  }, [idx])

  const onMouseLeave = useCallback(() => setDeletable(false), [])

  const omitIncluded = (data: ReqData): Omit<ReqData, 'included'> => {
    const { included, ...result } = data
    return result
  }

  return (
    <tr key={idx} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} css={tableRowCss}>
      <td css={tableCellCss} style={{ width: '4%' }}>
        <input
          type="checkbox"
          css={inputCss}
          checked={data['included']}
          onChange={e => onDataInputChange(idx, 'included', !data['included'])}
        />
      </td>
      {getObjectKeys(omitIncluded(data)).map(key => (
        <td key={`data-${idx}-${key}`} css={tableCellCss} style={{ width: '32%' }}>
          <input
            css={inputCss}
            name={key}
            value={data[key] as string}
            onChange={e => onDataInputChange(idx, key, e.target.value)}
            autoComplete="off"
          />
        </td>
      ))}
      {deletable ? (
        <button
          css={rowDeleteBtnCss}
          onClick={e => {
            e.preventDefault()
            deleteData(idx)
          }}
        >
          X
        </button>
      ) : null}
    </tr>
  )
}

import { getObjectKeys } from '@/utils/ObjectHandler'
import { css } from '@emotion/react'
import { useCallback, useState } from 'react'
import { dataColumns, getDefaultData } from './constants'
import { DataNames, ReqData } from './types'

// TODO: memo 활용해서 기존 cell 렌더 막기
export const ReqDataEditor: React.FC<{ name: DataNames }> = name => {
  const [datas, setDatas] = useState<ReqData[]>([getDefaultData()])

  const changeData = useCallback(
    (idx: number, key: keyof ReqData, value: string): void => {
      const targetData = { ...datas[idx] }
      targetData[key] = value
      setDatas(prev => [...prev.slice(0, idx), targetData, ...prev.slice(idx + 1)])
    },
    [datas]
  )

  const addData = useCallback((): void => {
    setDatas(prev => [...prev, getDefaultData()])
  }, [])

  const deleteData = useCallback((idx: number): void => {
    setDatas(prev => prev.filter((data, dataIdx) => idx !== dataIdx))
  }, [])

  const onDataInputChange = useCallback(
    (idx: number, key: keyof ReqData, value: string) => {
      changeData(idx, key, value)
      if (idx === datas.length - 1 && key === 'key' && value !== '') {
        addData()
      }
    },
    [addData, changeData]
  )

  return (
    <form>
      <table css={tableCss}>
        <thead>
          <tr>
            {dataColumns.map(col => (
              <th key={col} css={tableCellCss}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((data, idx) => (
            <tr key={idx}>
              <td css={tableCellCss}>
                <input type="checkbox" css={inputCss} defaultChecked />
              </td>
              {getObjectKeys(data).map(key => (
                <td key={`data-${idx}-${key}`} css={tableCellCss}>
                  <input
                    css={inputCss}
                    name={key}
                    value={data[key]}
                    onChange={e => onDataInputChange(idx, key, e.target.value)}
                    autoComplete="off"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  )
}

const tableCss = css`
  box-sizing: border-box;
  border-collapse: collapse;
  border-spacing: 0;
  max-width: 100%;
  color: rgb(0, 0, 0);
`

const tableCellCss = css`
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  border: 1px solid black;
`

const inputCss = css`
  border: none;
  outline: none;
`

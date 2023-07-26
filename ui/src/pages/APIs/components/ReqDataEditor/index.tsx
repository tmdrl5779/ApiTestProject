import { getObjectKeys } from '@/utils/ObjectHandler'
import { useContext } from '@/utils/RobustContext'
import { css } from '@emotion/react'
import { useCallback, useState } from 'react'
import { APIsContext } from '../../APIsContext'
import { dataColumns, getDefaultData } from '../../data/constants'
import { DataNames, ReqData } from '../../types'
import { DataRow } from './DataRow'
import { tableCellCss, tableCss } from './styles'

// TODO: memo 활용해서 기존 cell 렌더 막기
export const ReqDataEditor: React.FC<{ name: DataNames }> = ({ name }) => {
  const { datas, dispatchForDatas } = useContext(APIsContext)

  const changeData = useCallback(
    (idx: number, key: keyof ReqData, value: string): void => {
      dispatchForDatas({
        type: 'CHANGE',
        dataName: name,
        idx,
        key,
        value,
      })
    },
    [dispatchForDatas, name]
  )

  const addData = useCallback((): void => {
    dispatchForDatas({ type: 'ADD', dataName: name })
  }, [dispatchForDatas, name])

  const deleteData = useCallback(
    (idx: number): void => {
      dispatchForDatas({ type: 'DELETE', dataName: name, idx })
    },
    [dispatchForDatas, name]
  )

  const onDataInputChange = useCallback(
    (idx: number, key: keyof ReqData, value: string | boolean) => {
      dispatchForDatas({
        type: 'INPUT_CHANGE',
        dataName: name,
        idx,
        key,
        value,
      })
    },
    [dispatchForDatas, name]
  )

  return (
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
        {datas[name].map((data, idx) => (
          <DataRow
            key={`${name}-${idx}`}
            data={data}
            idx={idx}
            onDataInputChange={onDataInputChange}
            deleteData={deleteData}
          />
        ))}
      </tbody>
    </table>
  )
}

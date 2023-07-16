import { getObjectKeys } from '@/utils/ObjectHandler'
import { useCallback, useState } from 'react'

interface ReqData {
  key: string
  value: string
  description: string
}

const getDefaultData = () => ({ key: '', value: '', description: '' })

export const ReqDataEditor: React.FC = () => {
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
    <article style={{ display: 'flex', flexDirection: 'column', width: '510px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>KEY</div>
        <div>VALUE</div>
        <div>DESCRIPTION</div>
      </div>
      {datas.map((data, idx) => (
        <div style={{ display: 'flex' }} key={idx}>
          {getObjectKeys(data).map(key => (
            <input
              key={`data-${idx}-${key}`}
              name={key}
              value={data[key]}
              onChange={e => onDataInputChange(idx, key, e.target.value)}
            />
          ))}
        </div>
      ))}
    </article>
  )
}

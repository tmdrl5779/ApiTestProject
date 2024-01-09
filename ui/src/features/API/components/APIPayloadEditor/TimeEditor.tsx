import { TimePropertyNames, useAPIContext } from '../..'
import { IAPI } from 'api-types'
import { Input } from '@/components'
import { useCallback } from 'react'
import { css } from '@emotion/react'
import { color } from '@/data/variables.style'

const timeKeys: TimePropertyNames[] = ['connectionTime', 'readTime', 'writeTime']
const label = {
  connectionTime: 'Connection Timeout',
  readTime: 'Read Timeout',
  writeTime: 'Write Timeout',
}
const help = {
  connectionTime: '클라이언트와 서버가 연결하는데 소요되는 최대 시간',
  readTime: '클라이언트와 서버가 연결됐을 때, 클라이언트가 요청을 보내고 대기하는 최대 시간',
  writeTime: '클라이언트와 서버가 연결됐을 때, 서버가 데이터 요청을 대기하는 최대 시간',
}

export const TimeEditor = () => {
  const { api, updateSingleAPI } = useAPIContext()

  const onChangeTime = useCallback(
    (key: TimePropertyNames, value: number) => {
      updateSingleAPI({
        key,
        value,
        _tag: 'UpdateTimeAction',
      })
    },
    [updateSingleAPI]
  )

  return (
    <>
      {timeKeys.map(key => (
        <div className="row" key={key} css={timeRowCss}>
          <label className="label">
            <span>{label[key]}</span>
            <span className="help">{help[key]}</span>
          </label>
          <Input
            onChange={value => onChangeTime(key, Number(value))}
            type="number"
            value={api['request']['time'][key]}
            className="input"
          />
        </div>
      ))}
    </>
  )
}

const rect = {
  label: '600px',
  gap: '8px',
  input: '120px',
  fontSize: '20px',
}

const timeRowCss = css`
  display: flex;
  justify-content: left;
  align-items: space-between;
  padding: 4px 8px;
  width: 100%;
  border: 1px solid ${color.pale};

  .label {
    font-size: ${rect.fontSize};
    width: ${rect.label};
    text-align: left;
    margin-right: ${rect.gap};
    border-right: 1px solid ${color.pale};
    display: flex;
    flex-direction: column;
    .help {
      font-size: 16px;
      color: ${color.secondaryText};
    }
  }
  .input {
    margin-left: ${rect.gap};
    font-size: ${rect.fontSize};
    width: ${rect.input};
    border-radius: 4px;
    padding: 4px;
  }
`

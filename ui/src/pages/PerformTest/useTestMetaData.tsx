import { MetaDataForTestState, TestMetaData } from '@/data/store'
import { produce } from 'immer'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'

const MAX_THREADS= 7000

export type TestMetaDataConfigItem =
  | {
      label: string
      type: string
      value: number
      onChange: (value: string) => void
      placeholder: string
      min: number
      checked?: undefined
    }
  | {
      label: string
      type: string
      checked: boolean
      onChange: (value: string) => void
      placeholder: string
      value?: undefined
      min?: undefined
    }

export type TestMetaDataConfig = TestMetaDataConfigItem[]

export const useTestMetaData = () => {
  const [testMetaData, setTestMetaData] = useRecoilState<TestMetaData>(MetaDataForTestState)

  const setTestMetaDataByKey = useCallback(
    (key: keyof TestMetaData) => (value: string) =>
      setTestMetaData(prev =>
        produce(prev, draft => {
          if (key === 'isConcur') {
            draft[key] = !draft[key]
          } else {
            const numValue = Math.min(MAX_THREADS, Number(value))            
            draft[key] = numValue
          }
        })
      ),
    []
  )

  const testMetaDataConfig: TestMetaDataConfig = useMemo(
    () => [
      {
        label: 'Number of Threads (users)',
        type: 'number',
        value: testMetaData.userCount,
        onChange: setTestMetaDataByKey('userCount'),
        placeholder: '유저 수를 입력해주세요.',
        min: 1,
        max: 10000,
      },
      {
        label: 'Repeat Count',
        type: 'number',
        value: testMetaData.repeatCount,
        onChange: setTestMetaDataByKey('repeatCount'),
        placeholder: '반복 횟수를 입력해주세요.',
        min: 1,
      },
      {
        label: 'Loop Count (seconds)',
        type: 'number',
        value: testMetaData.interval,
        onChange: setTestMetaDataByKey('interval'),
        placeholder: 'API 호출 간격(시간)을 입력해주세요.',
        min: 0,
      },
      {
        label: '동시호출 활성화',
        type: 'checkbox',
        checked: testMetaData.isConcur,
        onChange: setTestMetaDataByKey('isConcur'),
        placeholder: '동시호출 활성화 여부를 체크해주세요',
      },
    ],
    [
      setTestMetaDataByKey,
      testMetaData.interval,
      testMetaData.isConcur,
      testMetaData.repeatCount,
      testMetaData.userCount,
    ]
  )

  return { testMetaData, testMetaDataConfig }
}

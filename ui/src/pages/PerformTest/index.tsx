import { Button, Funnel } from '@/components'
import { css } from '@emotion/react'
import { useCallback, useEffect, useState } from 'react'
import { EditPanel } from './EditPanel'
import { ResultPanel } from './ResultPanel'

export const PerformTest: React.FC = () => {
  const [step, setStep] = useState<'edit' | 'result'>('edit')
  const [startTestMsg, setStartTestMsg] = useState<null | string>(null)

  const onClickBackButton = useCallback(() => {
    setStep('edit')
  }, [])

  return (
    <div css={performTestMainCss}>
      {step === 'result' ? (
        <Button onClick={onClickBackButton} _css={backButtonCss}>
          뒤로 가기
        </Button>
      ) : null}
      <Funnel step={step}>
        <Funnel.Step name="edit">
          <EditPanel setStep={setStep} setStartTestMsg={setStartTestMsg} />
        </Funnel.Step>
        <Funnel.Step name="result">
          <ResultPanel startTestMsg={startTestMsg} />
        </Funnel.Step>
      </Funnel>
    </div>
  )
}

const performTestMainCss = css`
  height: 100%;
  padding: 8px;
  position: relative;
`

const backButtonCss = css`
  position: absolute;
  background: white;
  color: black;
  right: 14px;
  top: 10px;
  height: 40px;
  font-size: 16px;
`

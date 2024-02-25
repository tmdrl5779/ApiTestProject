import { Button, Funnel, Progress } from '@/components'
import { css } from '@emotion/react'
import { lazy, useCallback, useEffect, useState } from 'react'
const EditPanel = lazy(() => import('./EditPanel').then(module => ({ default: module['EditPanel'] })))
const ResultPanel = lazy(() => import('./ResultPanel').then(module => ({ default: module['ResultPanel'] })))

export const PerformTest: React.FC = () => {
  const [step, setStep] = useState<'edit' | 'result'>('edit')
  const [startTestMsg, setStartTestMsg] = useState<null | string>(null)

  const goToEdit = useCallback(() => {
    setStep('edit')
  }, [])

  return (
    <div css={performTestMainCss}>
      <Funnel step={step}>
        <Funnel.Step name="edit">
          <EditPanel setStep={setStep} setStartTestMsg={setStartTestMsg} />
        </Funnel.Step>
        <Funnel.Step name="result">
          <ResultPanel goToEdit={goToEdit} startTestMsg={startTestMsg} />
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

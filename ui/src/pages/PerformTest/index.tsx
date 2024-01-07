import { Funnel } from '@/components'
import { css } from '@emotion/react'
import { useCallback, useEffect, useState } from 'react'
import { EditPanel } from './EditPanel'
import { ResultPanel } from './ResultPanel'

export const PerformTest: React.FC = () => {
  const [step, setStep] = useState<'edit' | 'result'>('edit')
  const [startTestMsg, setStartTestMsg] = useState<null | string>(null)

  return (
    <div css={performTestMainCss}>
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
`

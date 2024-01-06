import { Accordion, Button, Funnel, Input, useAccordion } from '@/components'
import { color, overlayScrollBarYCss } from '@/data/variables.style'
import { useAPIList } from '@/hooks'
import { css } from '@emotion/react'
import { useCallback, useState } from 'react'
import { APIRequestEditor, renderAPITabTitle } from '@/features/API'
import { useTestMetaData } from './useTestMetaData'
import { motion } from 'framer-motion'

export const PerformTest: React.FC = () => {
  const { APIList, createAPI, deleteAPI, updateAPI } = useAPIList({ type: 'Test' })
  const { testMetaData, testMetaDataConfig } = useTestMetaData()
  const [expanded, setExpanded] = useAccordion()
  const [step, setStep] = useState<'edit' | 'result'>('edit')

  const onClickAddButton = useCallback(() => {
    createAPI()
  }, [createAPI])

  // 눌르면 1)소켓 연결 2)결과 페이지로 넘어감
  const onClickRunButton = useCallback(() => {
    setStep('result')
  }, [])

  return (
    <div css={performTestMainCss}>
      <Funnel step={step}>
        <Funnel.Step name="edit">
          <section css={metaDataEditorCss}>
            {testMetaDataConfig.map((config, idx) => (
              <div className="row" key={config.label}>
                <label className="label">{config.label}: </label>
                <Input {...config} className="input" />
                {idx === testMetaDataConfig.length - 1 ? (
                  <div css={controlCss}>
                    <Button _css={controlButtonCss} onClick={onClickAddButton} className="control-button">
                      API 추가
                    </Button>
                    <Button _css={controlButtonCss} onClick={onClickRunButton} className="control-button">
                      RUN
                    </Button>
                  </div>
                ) : null}
              </div>
            ))}
          </section>
          <motion.section layout layoutScroll css={apiEditorCss}>
            {APIList.map((api, idx) => (
              <Accordion
                key={api.uuid}
                idx={idx}
                expanded={expanded}
                setExpanded={setExpanded}
                height="300px"
                title={renderAPITabTitle(
                  `${api.request.httpMethod} ${api.request.url === '' ? 'Untitled Request' : api.request.url}`
                )}
              >
                <APIRequestEditor api={api} updateAPI={updateAPI} idx={idx} hasFetchFunc={false} />
              </Accordion>
            ))}
          </motion.section>
        </Funnel.Step>
        <Funnel.Step name="result">결과는 아직 없어</Funnel.Step>
      </Funnel>
    </div>
  )
}

const performTestMainCss = css`
  height: 100%;
  padding: 8px;
`

const width = {
  metaData: {
    label: '200px',
    input: '200px',
    gap: '8px',
  },
  controlButton: '80px',
}

const height = {
  metaDataEditor: '160px',
  controlButton: '40px',
}

const metaDataEditorCss = css`
  height: ${height.metaDataEditor};
  .row {
    display: flex;
    justify-content: left;
    align-items: space-between;
    padding: 4px 8px;
    width: 100%;
    .label {
      font-size: 16px;
      width: ${width.metaData.label};
      text-align: right;
      margin-right: ${width.metaData.gap};
    }
    .input {
      width: calc(100% - ${width.metaData.label});
    }
    .input[type='checkbox'] {
      width: 16px;
      margin-top: 2px;
      margin-left: 0px;
    }
  }
`

const controlCss = css`
  display: flex;
  justify-content: end;
  width: 100%;
`

const controlButtonCss = css`
  width: ${width.controlButton};
  height: ${height.controlButton};
  margin-left: 4px;
  justify-self: right;
`

const apiEditorCss = css`
  height: calc(100% - ${height.metaDataEditor});
  ${overlayScrollBarYCss};
`

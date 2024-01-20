import { Accordion, Button, Input, useAccordion } from '@/components'
import { overlayScrollBarYCss } from '@/data/variables.style'
import {
  APIRequestEditor,
  convertReqToBodyForFetch,
  renderAPITabTitle,
  useAPIList,
  UseAPIReturns,
  validateApiRequest,
} from '@/features/API'
import { DeleteOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { IAPI } from 'api-types'
import { motion, AnimatePresence } from 'framer-motion'
import { FC, useCallback } from 'react'
import { TestMetaData, TestMetaDataConfig, useTestMetaData } from './useTestMetaData'

const composeWebsocketMessage = (testMetaData: TestMetaData, APIList: IAPI[]): string => {
  const { userCount, repeatCount, interval, isConcur } = testMetaData
  return JSON.stringify({
    userCount: userCount,
    repeatCount: repeatCount,
    interval: interval,
    requestDataList: {
      performType: isConcur ? 'CONCUR' : 'SEQ',
      requestList: APIList.map(api => convertReqToBodyForFetch(api.request)),
    },
  })
}

interface EditPanelProps {
  setStep: React.Dispatch<React.SetStateAction<'edit' | 'result'>>
  setStartTestMsg: React.Dispatch<React.SetStateAction<string | null>>
}

export const EditPanel: FC<EditPanelProps> = ({ setStep, setStartTestMsg }) => {
  const { APIList, createAPI, deleteAPI, updateAPI } = useAPIList({ type: 'Test' })
  const { testMetaData, testMetaDataConfig } = useTestMetaData()
  const [expanded, setExpanded] = useAccordion()

  const onClickAddButton = useCallback(() => {
    createAPI()
  }, [createAPI])

  const onClickDeleteButton = useCallback(
    (id: string, idx: number) => (e: React.MouseEvent) => {
      e.stopPropagation()
      if (id === expanded) {
        setExpanded(false)
      }
      deleteAPI(idx)
    },
    [deleteAPI, expanded, setExpanded]
  )

  // 눌르면 결과 페이지로 넘어감 startMsg도 전달
  const onClickRunButton = useCallback(() => {
    const canSend = APIList.every(api => validateApiRequest(api.request).canSend)
    const alertMessage = APIList.map(api => validateApiRequest(api.request))
      .map((each, idx) => {
        if (each.canSend) {
          return ''
        }
        return `${idx + 1}번째 API의 ${each.message}\n`
      })
      .join('')
    if (canSend) {
      setStep('result')
      setStartTestMsg(composeWebsocketMessage(testMetaData, APIList))
    } else {
      alert(alertMessage)
    }
  }, [APIList, setStartTestMsg, setStep, testMetaData])
  return (
    <>
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
      <motion.section css={apiEditorCss}>
        <AnimatePresence>
          {APIList.map((api, idx) => (
            <Accordion
              key={api.uuid}
              id={api.uuid}
              expanded={expanded}
              setExpanded={setExpanded}
              height="300px"
              title={renderAPITabTitle(
                `${api.request.httpMethod} ${api.request.url === '' ? 'Untitled Request' : api.request.url}`
              )}
              actions={
                <>
                  <Button type="text" onClick={onClickDeleteButton(api.uuid, idx)} css={[deleteButtonCss]}>
                    <DeleteOutlined />
                  </Button>
                </>
              }
            >
              <APIRequestEditor api={api} updateAPI={updateAPI} idx={idx} hasFetchFunc={false} />
            </Accordion>
          ))}
        </AnimatePresence>
      </motion.section>
    </>
  )
}

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

const deleteButtonCss = css`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0;
  right: 0;
`

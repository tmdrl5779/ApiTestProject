import { Button, Input, Loader, Select, Tabs, TabsItem, WrappedChangeEventHandler } from '@/components'
import { color, methodColor, overlayScrollBarYCss } from '@/data/variables.style'
import { UseAPIReturns, useToggle } from '@/hooks'
import { fetchApi } from '@/remotes/fetchApi'
import { parseCookie } from '@/utils'
import { css } from '@emotion/react'
import { FetchApiRequest, FetchApiResponse, IAPI } from 'api-types'
import { AxiosError, AxiosResponse } from 'axios'
import { Dictionary, StringObject } from 'common-types'
import { Draft, produce } from 'immer'
import { ChangeEventHandler, FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { dataColumns, httpMethods } from '../data/constants'
import { convertReqToBodyForFetch } from '../utils/convertReqToBodyForFetch'
import { parseResponse } from '../utils/parseResponse'
import { APIPayloadEditor } from './APIPayloadEditor'
import { APIResponseViewer } from './APIResponseViewer'

interface APIDetailProps {
  idx: number
  api: IAPI
  updateAPI: UseAPIReturns['updateAPI']
}

// TODO: 재렌더링 줄이기 - memo활용
export const APIDetail: FC<APIDetailProps> = ({ idx, api, updateAPI }) => {
  const [sendBtnPressed, toggleSendButton] = useToggle(false)

  const apiMutation = useMutation<AxiosResponse, AxiosError, FetchApiRequest, FetchApiResponse>({
    mutationFn: (request: IAPI['request']) => {
      return fetchApi(convertReqToBodyForFetch(request))
    },
    onSuccess: (response: AxiosResponse) => {
      parseResponse(response).then(parsedResponse => {
        updateAPI(idx)({
          response: parsedResponse,
          _tag: 'UpdateResponseAction',
        })
      })
    },
    onError: (error: AxiosError) => {
      updateAPI(idx)({
        response: {
          code: error.code ?? '',
          message: error.message,
        },
        _tag: 'UpdateResponseAction',
      })
    },
  })

  const { isLoading, data } = apiMutation

  useEffect(() => {
    if (sendBtnPressed) {
      apiMutation.mutate(api.request)
      toggleSendButton()
    }
  }, [api.request, apiMutation, sendBtnPressed, toggleSendButton])

  const onClickSendButton = useCallback(() => {
    toggleSendButton()
  }, [toggleSendButton])

  const onChangeMethod: WrappedChangeEventHandler = useCallback(
    value => {
      updateAPI(idx)({
        key: 'httpMethod',
        value,
        _tag: 'UpdateMetaAction',
      })
    },
    [idx, updateAPI]
  )

  const onChangeUrl: WrappedChangeEventHandler = useCallback(
    value => {
      updateAPI(idx)({
        key: 'url',
        value,
        _tag: 'UpdateMetaAction',
      })
    },
    [idx, updateAPI]
  )

  const updateSingleAPI = useMemo(() => updateAPI(idx), [idx, updateAPI])

  return (
    <div css={apiMainCss}>
      {/* TODO: ErrorBoundary + Suspense 활용 */}
      <section css={reqSectionCss}>
        <div css={reqSectionHeaderCss}>
          <Select
            className="method-select"
            items={httpMethods}
            value={api.request.httpMethod}
            onChange={onChangeMethod}
          />
          <Input
            className="url-input"
            value={api.request.url}
            placeholder="Request URL을 입력해주세요."
            onChange={onChangeUrl}
          />
          <Button onClick={onClickSendButton} className="send-button" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
        <APIPayloadEditor updateAPI={updateSingleAPI} api={api} />
      </section>
      <section css={resSectionCss}>
        <Loader isLoading={isLoading}>
          <APIResponseViewer response={api.response} />
        </Loader>
      </section>
    </div>
  )
}

const apiMainCss = css`
  height: calc(100%);
  padding: 8px;
`
// TODO: Res, Req 높이 줄이고 늘이게 하기
const reqSectionCss = css`
  position: relative;
  overflow: hidden;
  height: 50%;
`
const resSectionCss = css`
  ${reqSectionCss}
  border-top: 1px solid ${color.pale};
`

const reqSectionHeaderCss = css`
  display: flex;
  align-items: stretch;
  height: 40px;
  .method-select {
    width: 120px;
    border-radius: 4px;
  }
  .url-input {
    width: calc(100% - 120px - 4px);
    margin-left: 4px;
    border-radius: 4px;
  }
  .send-button {
    width: calc(10% - 8px);
    margin-left: 4px;
    height: 40px;
  }
`

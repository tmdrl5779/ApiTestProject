import { Button, Input, Select, WrappedChangeEventHandler } from '@/components'
import { fetchApi } from '@/remotes/fetchApi'
import { useContext } from '@/utils/RobustContext'
import { css } from '@emotion/react'
import { FetchApiRequest, FetchApiResponse, IAPI } from 'api-types'
import { AxiosError, AxiosResponse } from 'axios'
import { FC, useCallback, useEffect } from 'react'
import { useMutation } from 'react-query'
import { httpMethods } from '../data/constants'
import { height, width } from '../rect'
import { convertReqToBodyForFetch } from '../utils/convertReqToBodyForFetch'
import { parseResponse } from '../utils/parseResponse'
import { useAPIContext } from './APIContext'

export const APIContoller: FC = () => {
  const { api, updateSingleAPI, setIsFetching } = useAPIContext()

  const apiMutation = useMutation<AxiosResponse, AxiosError, FetchApiRequest, FetchApiResponse>({
    mutationFn: (request: IAPI['request']) => {
      return fetchApi(convertReqToBodyForFetch(request))
    },
    onSuccess: (response: AxiosResponse) => {
      parseResponse(response).then(parsedResponse => {
        updateSingleAPI({
          response: parsedResponse,
          _tag: 'UpdateResponseAction',
        })
      })
    },
    onError: (error: AxiosError) => {
      updateSingleAPI({
        response: {
          name: error.code ?? '',
          message: error.message,
        },
        _tag: 'UpdateResponseAction',
      })
    },
    // useErrorBoundary: true,
  })

  const { isLoading } = apiMutation

  useEffect(() => {
    setIsFetching(isLoading)
  }, [isLoading, setIsFetching])

  const onClickSendButton = useCallback(() => {
    apiMutation.mutate(api.request)
  }, [api.request, apiMutation])

  const onChangeMethod: WrappedChangeEventHandler = useCallback(
    value => {
      updateSingleAPI({
        key: 'httpMethod',
        value,
        _tag: 'UpdateMetaAction',
      })
    },
    [updateSingleAPI]
  )

  const onChangeUrl: WrappedChangeEventHandler = useCallback(
    value => {
      updateSingleAPI({
        key: 'url',
        value,
        _tag: 'UpdateMetaAction',
      })
    },
    [updateSingleAPI]
  )
  return (
    <div css={apiControllerCss}>
      <Select className="method-select" items={httpMethods} value={api.request.httpMethod} onChange={onChangeMethod} />
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
  )
}

const apiControllerCss = css`
  display: flex;
  align-items: stretch;
  height: ${height.controller};
  .method-select {
    width: ${width.controller.methodSelect};
    border-radius: 4px;
  }
  .url-input {
    width: calc(100% - ${width.controller.methodSelect} - ${width.controller.gap});
    margin-left: ${width.controller.gap};
    border-radius: 4px;
  }
  .send-button {
    width: calc(10% - 2 * ${width.controller.gap});
    margin-left: ${width.controller.gap};
    height: ${height.controller};
  }
`

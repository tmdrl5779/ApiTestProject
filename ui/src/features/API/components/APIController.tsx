import { Button, Input, Select, WrappedChangeEventHandler } from '@/components'
import { fetchApi } from '@/remotes/fetchApi'
import { css } from '@emotion/react'
import { FetchApiRequest, FetchApiResponse, FetchApiResponseError, IAPI } from 'api-types'
import { AxiosError, AxiosResponse } from 'axios'
import { FC, useCallback, useEffect } from 'react'
import { useMutation } from 'react-query'
import { httpMethods } from '../data/constants'
import { height, width } from '../data/rect'
import { convertReqToBodyForFetch } from '../utils/convertReqToBodyForFetch'
import { parseResponse } from '../utils/parseResponse'
import { useAPIContext } from '../APIContext'
import { validateApiRequest } from '..'

interface APIControllerProps {
  hasFetchFunc?: boolean
  setIsFetching?: React.Dispatch<React.SetStateAction<boolean>>
}

export const APIContoller: FC<APIControllerProps> = ({ hasFetchFunc = true, setIsFetching }) => {
  const { api, updateSingleAPI } = useAPIContext()
  const apiMutation = useMutation<AxiosResponse, AxiosError, FetchApiRequest, FetchApiResponse>({
    mutationFn: (request: IAPI['request']) => {
      return fetchApi(convertReqToBodyForFetch(request))
    },
    onSuccess: (response: AxiosResponse) => {
      updateSingleAPI({
        response: parseResponse(response.data[0]),
        _tag: 'UpdateResponseAction',
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
    setIsFetching?.(isLoading)
  }, [isLoading, setIsFetching])

  const onClickSendButton = useCallback(() => {
    const { canSend, message } = validateApiRequest(api.request)
    if (canSend) {
      apiMutation.mutate(api.request)
    } else {
      alert(message)
    }
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
      {hasFetchFunc ? (
        <Button onClick={onClickSendButton} className="send-button" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      ) : null}
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

import { Button, Input, Loader, Select, Tabs, TabsItem } from '@/components'
import { color, methodColor } from '@/data/variables.style'
import { UseAPIReturns } from '@/hooks'
import { fetchApi } from '@/remotes/fetchApi'
import { css } from '@emotion/react'
import { FetchApiResponse, IAPI } from 'api-types'
import { Draft, produce } from 'immer'
import { ChangeEventHandler, FC, useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { httpMethods } from '../data/constants'
import { convertReqToBodyForFetch } from '../utils/convertReqToBodyForFetch'
import { APIPayloadEditor } from './APIPayloadEditor'
import { APIResponseViewer } from './APIResponseViewer'

interface APIDetailProps {
  api: IAPI
  updateAPI: ReturnType<UseAPIReturns['updateAPI']>
}

// TODO: 재렌더링 줄이기 - memo활용
export const APIDetail: FC<APIDetailProps> = ({ api, updateAPI }) => {
  const [response, setResponse] = useState<FetchApiResponse | undefined>(undefined)

  const apiMutation = useMutation({
    mutationFn: (api: IAPI) => {
      return fetchApi(convertReqToBodyForFetch(api.request))
    },
    onSuccess: (data, variables, context) => {
      setResponse(data)
    },
  })

  useEffect(() => {
    console.log(response)
  }, [response])

  const { isLoading } = apiMutation

  const onClickSendButton = useCallback(() => {
    apiMutation.mutate(api)
  }, [api, apiMutation])

  const updateAPIImmutable = useCallback(
    (recipe: (draft: Draft<IAPI>) => void) => {
      updateAPI(produce(api, recipe))
    },
    [api, updateAPI]
  )

  const onChangeMethod: ChangeEventHandler = useCallback(
    e => {
      updateAPIImmutable(draft => {
        draft['request']['httpMethod'] = (e.target as HTMLSelectElement).value
      })
    },
    [updateAPIImmutable]
  )

  const onChangeUrl: ChangeEventHandler = useCallback(
    e => {
      updateAPIImmutable(draft => {
        draft['request']['url'] = (e.target as HTMLInputElement).value
      })
    },
    [updateAPIImmutable]
  )

  return (
    <div css={apiMainCss}>
      {/* TODO: ErrorBoundary + Suspense 활용 */}
      <section css={reqSectionCss}>
        <div css={reqSectionHeaderCss}>
          <Select className="method-select" value={api.request.httpMethod} onChange={onChangeMethod}>
            {httpMethods.map(method => (
              <option value={method} key={method}>
                {method}
              </option>
            ))}
          </Select>
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
        <APIPayloadEditor updateAPIImmutable={updateAPIImmutable} api={api} />
      </section>
      <section css={resSectionCss}>
        <Loader isLoading={isLoading}>
          <APIResponseViewer response={response} />
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
  height: 50%;
`
const resSectionCss = css`
  position: relative;
  height: 50%;
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
    height: 38px;
  }
`

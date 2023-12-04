import { Button, Input, Loader, Select, Tabs, TabsItem } from '@/components'
import { color, methodColor, overlayScrollBarYCss } from '@/data/variables.style'
import { UseAPIReturns } from '@/hooks'
import { fetchApi } from '@/remotes/fetchApi'
import { parseCookie } from '@/utils'
import { css } from '@emotion/react'
import { FetchApiRequest, FetchApiResponse, IAPI, ResponseData } from 'api-types'
import { AxiosError } from 'axios'
import { Dictionary, StringObject } from 'common-types'
import { Draft, produce } from 'immer'
import { ChangeEventHandler, FC, useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { dataColumns, httpMethods } from '../data/constants'
import { DataForResponseViewer } from '../types'
import { convertReqToBodyForFetch } from '../utils/convertReqToBodyForFetch'
import { parseResponse } from '../utils/parseResponse'
import { APIPayloadEditor } from './APIPayloadEditor'
import { APIResponseViewer } from './APIResponseViewer'

interface APIDetailProps {
  api: IAPI
  updateAPI: ReturnType<UseAPIReturns['updateAPI']>
}

// TODO: 재렌더링 줄이기 - memo활용
export const APIDetail: FC<APIDetailProps> = ({ api, updateAPI }) => {
  const [dataForResponseViewer, setDataForResponseViewer] = useState<DataForResponseViewer | null>(null)

  const apiMutation = useMutation<FetchApiResponse, AxiosError, FetchApiRequest, FetchApiResponse>({
    mutationFn: (request: IAPI['request']) => {
      return fetchApi(convertReqToBodyForFetch(request))
    },
    onSuccess: data => {
      // TODO: 상태만 변경하는게 아니라 recoil 상태를 바꿔야대
      parseResponse(data as any).then(({ body, headers }) => {
        setDataForResponseViewer({
          body: body as StringObject,
          headers: headers as Dictionary<string>,
          cookies: parseCookie(),
        })
      })
    },
  })

  useEffect(() => {
    console.log(dataForResponseViewer)
  }, [dataForResponseViewer])

  const { isLoading, data } = apiMutation

  const onClickSendButton = useCallback(() => {
    apiMutation.mutate(api.request)
  }, [api.request, apiMutation])

  // TODO: api deps에서 빼야함, api 전달 대신 key value 전달 형태로 변경 필요
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
          <APIResponseViewer data={dataForResponseViewer} />
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
    height: 38px;
  }
`

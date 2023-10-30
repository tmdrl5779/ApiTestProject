import { Button, Input, Loader, Select, Tabs, TabsItem } from '@/components'
import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { IAPI } from 'api-types'
import { FC, useState } from 'react'
import { httpMethods } from '../data/constants'
import { APIPayloadEditor } from './APIPayloadEditor'
import { APIResponseViewer } from './APIResponseViewer'

interface APIDetailProps {
  api: IAPI
}

// TODO: 재렌더링 줄이기 - memo활용
export const APIDetail: FC<APIDetailProps> = ({ api }) => {
  // TODO: 데이터 변경 로직 추가
  // TODO: React Query 사용한 방식으로 변경
  // 일단은 css용임
  const [isLoading, setIsLoading] = useState(false)

  const mockLoading = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div css={apiMainCss}>
      <section css={reqSectionCss}>
        <div css={reqSectionHeaderCss}>
          <Select className="method-select" value={api.request.httpMethod}>
            {httpMethods.map(method => (
              <option value={method} key={'method'}>
                {method}
              </option>
            ))}
          </Select>
          <Input
            className="url-input"
            value={api.request.url}
            placeholder="Request URL을 입력해주세요."
            onChange={e => e}
          />
          <Button onClick={mockLoading} className="send-button" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
        {/* TODO: Method명에 색깔 넣기 */}
        <APIPayloadEditor />
      </section>
      <section css={resSectionCss}>
        <Loader isLoading={isLoading}>
          <APIResponseViewer />
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

import { Button, Input, Select, Tabs, TabsItem } from '@/components'
import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { IAPI } from 'api-types'
import { FC, useState } from 'react'
import { httpMethods } from '../data/constants'
import { APIPayloadEditor } from './APIPayloadEditor'

export const reqTabItems: TabsItem[] = [
  { title: 'Params', code: 'Params' },
  { title: 'Headers', code: 'Headers' },
  { title: 'Body', code: 'Body' },
]

export const resTabItems: TabsItem[] = [
  { title: 'Body', code: 'Body' },
  { title: 'Cookies', code: 'Cookies' },
  { title: 'Headers', code: 'Headers' },
  { title: 'Test Results', code: 'Test Results' },
]

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
    }, 1000)
  }

  return (
    <div css={apiMainCss}>
      <section css={reqSectionCss}>
        <div css={reqSectionHeaderCss}>
          <Select className="method-select" value={api.request.httpMethod}>
            {httpMethods.map(method => (
              <option value={method}>{method}</option>
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
        <Tabs
          items={reqTabItems}
          // selectedCode={selectedTabCode}
          // onSelect={onSelectTab}
          background={color.background}
          type="line"
          tabPosition="top"
        />
        <APIPayloadEditor />
      </section>
      <section css={resSectionCss} style={isLoading ? { opacity: 0.3 } : {}}>
        <Tabs
          items={resTabItems}
          // selectedCode={selectedTabCode}
          // onSelect={onSelectTab}
          background={color.background}
          type="line"
          tabPosition="top"
        />
        {/* TODO: Loader 컴포넌트로 대체 (막대, 캐릭터 2가지) */}
        {isLoading ? '로딩~' : '안로딩~'}
      </section>
    </div>
  )
}

const apiMainCss = css`
  height: calc(100% - 40px);
  padding: 8px;
`

const reqSectionCss = css`
  position: relative;
  height: 60%;
`
const resSectionCss = css`
  position: relative;
  height: 40%;
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

import { Button, Input, Select, Tabs, TabsItem } from '@/components'
import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { IAPI } from 'api-types'
import { FC } from 'react'
import { httpMethods } from '../data/constants'

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

export const APIDetail: FC<APIDetailProps> = ({ api }) => {
  return (
    <div css={apiMainCss}>
      <section css={reqSectionCss}>
        <div css={reqSectionHeaderCss}>
          <Select className="method-select">
            {httpMethods.map(method => (
              <option value={method} selected={method === api.request.httpMethod ? true : false}>
                {method}
              </option>
            ))}
          </Select>
          <Input className="url-input" value={api.request.url} onChange={e => e} />
          <Button onClick={e => e} className="send-button">
            Send
          </Button>
        </div>
        <Tabs
          items={reqTabItems}
          // selectedCode={selectedTabCode}
          // onSelect={onSelectTab}
          background={color.background}
          type="line"
          tabPosition="top"
        />
      </section>
      <section css={resSectionCss}>
        <Tabs
          items={resTabItems}
          // selectedCode={selectedTabCode}
          // onSelect={onSelectTab}
          background={color.background}
          type="line"
          tabPosition="top"
        />
      </section>
    </div>
  )
}

const apiMainCss = css`
  height: calc(100% - 40px);
  padding: 4px;
`

const reqSectionCss = css`
  height: 60%;
`
const resSectionCss = css`
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

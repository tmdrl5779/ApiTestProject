import { Select, Tabs, TabsItem } from '@/components'
import { color, overlayScrollBarCss } from '@/data/variables.style'
import { css } from '@emotion/react'
import { FC, useCallback, useState } from 'react'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/1337.css'

export const resBodyTypes: TabsItem[] = ['Pretty', 'Raw'].map(type => ({
  title: type,
  code: type,
}))

export const PrettierExtensions = ['JSON', 'XML', 'HTML', 'Text', 'Auto']

const jsonExample = { 한글: '가나다라마바사', 숫자모음: [0, 1, 2, 3, 4, 5], 그룹: { 그룹1: '3명', 그룹2: '5명' } }

// TODO: Tabs + Blinker + Funnel + useState로 tab선택로직 관리까지 묶어서 하나로 쓰자
export const Body: FC = () => {
  const [resBodyTypeCode, setResBodyTypeCode] = useState(resBodyTypes[0].code)
  const onClickBodyType = useCallback((code: string) => {
    setResBodyTypeCode(code)
  }, [])
  return (
    <>
      <div css={bodyHeaderCss}>
        <Tabs
          lineVisible={false}
          items={resBodyTypes}
          selectedCode={resBodyTypeCode}
          onSelect={onClickBodyType}
          _css={tabsOverrideCss}
        />
        <Select _css={selectOverrideCss}>
          {PrettierExtensions.map(ext => (
            <option value={ext} key={ext}>
              {ext}
            </option>
          ))}
        </Select>
      </div>
      <div css={bodyContentCss}>
        {/* <pre>
          <code>{JSON.stringify(jsonExample, null, 2)}</code>
        </pre> */}
        <JSONPretty
          id="json-pretty"
          data={jsonExample}
          mainStyle={`margin: 0; background: ${color.background}`}
        ></JSONPretty>
      </div>
    </>
  )
}

const selectOverrideCss = css`
  // height: 100%;
  margin-left: 8px;
  padding: 8px 4px;
  border-radius: 4px;
`

const tabsOverrideCss = css`
  display: inline-flex;
  width: auto;
  border-radius: 4px;
  height: 40px;
  background: ${color.topGradient};
  .item {
    height: 40px;
    // padding: 8px;
  }
`

const bodyHeaderCss = css`
  display: flex;
  align-items: stretch;
  padding: 8px 0;
`

const bodyContentCss = css`
  height: calc(100% - 40px - 16px);
  ${overlayScrollBarCss};
`

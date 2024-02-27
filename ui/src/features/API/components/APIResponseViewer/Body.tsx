import { Blinker, Select, Tabs, TabsItem, WrappedChangeEventHandler } from '@/components'
import { color, overlayScrollBarYCss } from '@/data/variables.style'
import { css } from '@emotion/react'
import { FetchApiResponse } from 'api-types'
import { StringObject } from 'common-types'
import { ChangeEvent, ChangeEventHandler, FC, useCallback, useMemo, useState } from 'react'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/1337.css'

export const resBodyTypes: TabsItem[] = ['Pretty', 'Raw'].map(type => ({
  title: type,
  code: type,
}))

// html, XML은 추후 필요시 개발~
export const PrettierExtensions = ['JSON']

interface BodyProps {
  body: FetchApiResponse['body']
}

export const Body: FC<BodyProps> = ({ body }) => {
  const [resBodyTypeCode, setResBodyTypeCode] = useState(resBodyTypes[0].code)

  // POST: 블로그에 넣자 type 배열 -> union 변환하는 법
  const [prettierType, setPrettierType] = useState<(typeof PrettierExtensions)[number]>(PrettierExtensions[0])

  const onSelectBodyType = useCallback((code: string) => {
    setResBodyTypeCode(code)
  }, [])

  const onSelectPrettierType: WrappedChangeEventHandler = useCallback(value => {
    setPrettierType(value)
  }, [])

  const stringifiedBody = useMemo(() => JSON.stringify(body), [body])

  return (
    <>
      <div css={bodyHeaderCss}>
        <Tabs
          lineVisible={false}
          items={resBodyTypes}
          selectedCode={resBodyTypeCode}
          onSelect={onSelectBodyType}
          _css={tabsOverrideCss}
        />
        {resBodyTypeCode === 'Pretty' ? (
          <Select
            _css={selectOverrideCss}
            items={PrettierExtensions}
            value={prettierType}
            onChange={onSelectPrettierType}
          />
        ) : null}
      </div>
      <div css={bodyContentCss}>
        <Blinker _key={resBodyTypeCode}>
          {resBodyTypeCode === 'Pretty' ? (
            <>
              {prettierType === 'JSON' ? (
                <JSONPretty
                  id="json-pretty"
                  data={body}
                  mainStyle={`margin: 0; background: ${color.background}`}
                ></JSONPretty>
              ) : null}
            </>
          ) : (
            <span>{stringifiedBody}</span>
          )}
        </Blinker>
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
  color: ${color.primaryText};
  ${overlayScrollBarYCss};
`

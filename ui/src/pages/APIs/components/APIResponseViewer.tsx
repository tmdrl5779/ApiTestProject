import { Tabs, TabsItem } from '@/components'
import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { FC, useCallback, useState } from 'react'

export const resTabItems: TabsItem[] = [
  { title: 'Body', code: 'Body' },
  { title: 'Cookies', code: 'Cookies' },
  { title: 'Headers', code: 'Headers' },
  { title: 'Test Results', code: 'Test Results' },
]

export const resBodyTypes: TabsItem[] = ['Pretty', 'Raw', 'Preview', 'Visualize'].map(type => ({
  title: type,
  code: type,
}))

export const APIResponseViewer: FC = () => {
  const [resBodyTypeCode, setResBodyTypeCode] = useState(resBodyTypes[0].code)
  const onClickBodyType = useCallback((code: string) => {
    setResBodyTypeCode(code)
  }, [])
  return (
    <>
      <Tabs
        items={resTabItems}
        // selectedCode={selectedTabCode}
        // onSelect={onSelectTab}
        background={color.background}
        type="line"
        tabPosition="top"
      />
      <Tabs
        lineVisible={false}
        items={resBodyTypes}
        selectedCode={resBodyTypeCode}
        onSelect={onClickBodyType}
        _css={tabsOverrideCss}
      />
      <pre>
        <code>
          {`document.querySelectorAll("#sample1 .sampleBtn3 a").forEach(btn => {
  btn.addEventListener("click", (e)=> {
    const text = btn.innerText;
    document.querySelectorAll("#sample1 .text-box .box").forEach(box => {
      box.setAttribute("style", text);
    })
  })
});
    `}
        </code>
      </pre>
    </>
  )
}

const tabsOverrideCss = css`
  margin-top: 8px;
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

import { useState } from 'react'
import { APIsContext } from './APIsContext'
import { BodyEditor } from './BodyEditor'
import { getDefaultDatas, httpMethods, tabItems } from './constants'
import { HeadersEditor } from './HeadersEditor'
import { ParamsEditor } from './ParamsEditor'
import { ReqDataEditor } from './ReqDataEditor'
import { ReqDataTabs } from './ReqDataTabs'
import { Datas, HttpMethods, ReqData, TabItem } from './types'

// css ㄴㄴ 기능만 먼저
export const APIs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabItems[0])
  const [method, setMethod] = useState<HttpMethods>(httpMethods[0])
  const [url, setUrl] = useState<string>('')
  const [datas, setDatas] = useState<Datas>({
    Params: getDefaultDatas(),
    Headers: getDefaultDatas(),
    Body: getDefaultDatas(),
  })

  return (
    <APIsContext.Provider value={{ method, url, datas, setDatas }}>
      <main>
        <section>
          <select>
            {httpMethods.map(method => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <input />
          <button>Send</button>
        </section>
        <ReqDataTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab.tabTitle === 'Params' ? <ParamsEditor /> : null}
        {selectedTab.tabTitle === 'Headers' ? <BodyEditor /> : null}
        {selectedTab.tabTitle === 'Body' ? <HeadersEditor /> : null}
        {/* <ReqDataEditor /> */}
      </main>
    </APIsContext.Provider>
  )
}

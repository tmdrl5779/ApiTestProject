import { httpMethods } from './constants'
import { ReqDataEditor } from './ReqDataEditor'

// css ㄴㄴ 기능만 먼저
export const APIs: React.FC = () => {
  return (
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
      <section>
        <ReqDataEditor />
      </section>
      <section></section>
    </main>
  )
}

import { Tabs } from './components/Tabs'
import { Content } from './layouts/Content'
import { GNB } from './layouts/GNB'
import { SNB } from './layouts/SNB'
import '../src/assets/global.css'
import { Layout } from './layouts/Layout'

function App() {
  return (
    <div className="App">
      <Layout>
        <GNB />
        <SNB />
        <Content />
      </Layout>
    </div>
  )
}

export default App

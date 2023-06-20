import { Tabs } from './components/Tabs'

function App() {
  return (
    <div className="App">
      <Tabs>
        <Tabs.Item value="1">1</Tabs.Item>
        <Tabs.Item value="2">2</Tabs.Item>
      </Tabs>
    </div>
  )
}

export default App

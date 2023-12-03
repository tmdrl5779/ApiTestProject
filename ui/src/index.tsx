import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'

if (process.env.NODE_ENV === 'development' && process.env['USE_MSW'] === 'true') {
  const { worker } = require('./mocks/browser')
  console.log('msw worker start!')
  worker.start()
}

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)

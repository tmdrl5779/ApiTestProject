declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly REACT_APP_ADAPTOR_BASE_URL: string
    readonly REACT_APP_ADAPTOR_WEBSOCKET_URL: string
  }
}

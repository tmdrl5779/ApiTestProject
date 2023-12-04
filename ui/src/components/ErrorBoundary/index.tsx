import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Error } from '@/components'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    message: '오류가 발생했습니다...',
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public override render() {
    if (this.state.hasError) {
      return <Error message={this.state.message} />
    }

    return this.props.children
  }
}

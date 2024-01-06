import { Component, ComponentType, PropsWithChildren } from 'react'
import { Error } from './Error'

interface ErrorBoundaryProps {
  onReset?: () => void
}

interface ErrorBoundaryState {
  error: Error | null
}

const initialState: ErrorBoundaryState = {
  error: null,
}

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  override state: ErrorBoundaryState = {
    error: null,
  }

  resetErrorBoundary = () => {
    this.props.onReset?.()
    this.setState(initialState)
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  override render() {
    if (this.state.error) {
      return <Error error={this.state.error} resetErrorBoundary={this.resetErrorBoundary} />
    }

    return this.props.children
  }
}

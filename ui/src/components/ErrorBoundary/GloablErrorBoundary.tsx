import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { Component, ComponentType, PropsWithChildren } from 'react'
import { Error } from './Error'

interface GlobalErrorBoundaryProps {
  onReset?: () => void
}

interface GlobalErrorBoundaryState {
  error: Error | null
}

const initialState: GlobalErrorBoundaryState = {
  error: null,
}

export class GlobalErrorBoundary extends Component<
  PropsWithChildren<GlobalErrorBoundaryProps>,
  GlobalErrorBoundaryState
> {
  override state: GlobalErrorBoundaryState = {
    error: null,
  }

  resetErrorBoundary = () => {
    this.props.onReset?.()
    this.setState(initialState)
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return { error }
  }

  // TODO: sentry 로깅

  override render() {
    // TODO: 예상치 못한 오류인지 서버점검중인지 판별해서 다르게 렌더
    if (this.state.error) {
      const unExpectedError = {
        name: '예상하지 못한 오류',
        message: '서버 응답이 없거나 네트워크 연결이 원활하지 않습니다.',
      }
      return (
        <div css={fullScreenCss}>
          <Error error={unExpectedError} />{' '}
        </div>
      )
    }

    return this.props.children
  }
}

const fullScreenCss = css`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: ${color.background};
`

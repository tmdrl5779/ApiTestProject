import LoaderGif from '@/assets/images/Loader.gif'
import { css } from '@emotion/react'
import { FC, ReactNode } from 'react'

const loaderSideLen = '200px'

export interface LoaderProps {
  children: ReactNode
  isLoading: boolean
}

// 부모와 크기 똑같음
export const Loader: FC<LoaderProps> = ({ children, isLoading }) => {
  const _loaderWrapperCss = isLoading ? [loaderWrapperCss, blurCss] : loaderWrapperCss
  return (
    <>
      <div css={_loaderWrapperCss}>{children}</div>
      {isLoading ? (
        <div css={loaderCoverCss}>
          <img src={LoaderGif} alt="로딩중" width={loaderSideLen} height={loaderSideLen} />
        </div>
      ) : null}
    </>
  )
}

const loaderWrapperCss = css`
  width: 100%;
  height: 100%;
  position: relative;
`

const blurCss = css`
  opacity: 0.3;
`

const loaderCoverCss = css`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index
`

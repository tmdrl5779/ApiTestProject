import { overlayScrollBarYCss } from '@/data/variables.style'
import { css } from '@emotion/react'

export const tableWrapperScrollableCss = css`
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  ${overlayScrollBarYCss}
  overflow-x: hidden;
`

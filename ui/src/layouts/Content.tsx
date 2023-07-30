import { color, height } from '@/data/variables.style'
import { css } from '@emotion/react'
import { ReactNode } from 'react'

export const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <main css={contentCss}>{children}</main>
}

const contentCss = css`
  padding: 16px;
  background-color: ${color.background};
  color: ${color.primaryText};
  min-height: 600px;
  height: calc(100vh - ${height.GNB});
  max-height: calc(100vh - ${height.GNB};
  overflow-y: auto;
  flex: auto;
`

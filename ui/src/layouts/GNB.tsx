import { ReactNode } from 'react'
import { css } from '@emotion/react'
import { color } from '@/data/variables.style'

export const GNB: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <header css={GNBCss}>{children}</header>
}

const GNBCss = css`
  height: 64px;
  padding: 0 16px;
  color: ${color.primaryText};
  line-height: 64px;
  background: ${color.navBar};
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${color.pale};
`

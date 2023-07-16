import { height, width } from '@/data/variables.style'
import { css } from '@emotion/react'
import { ReactNode, useMemo } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return <section css={layoutCss}>{children}</section>
}

const layoutCss = css`
  display: grid;
  grid-template-columns: ${width.SNB} auto;
  grid-template-rows: ${height.GNB} auto;
  gap: 0;
`

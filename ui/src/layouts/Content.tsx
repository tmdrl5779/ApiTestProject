import { height, width } from '@/data/variables.style'
import { css } from '@emotion/react'
import { ReactNode } from 'react'

interface ContentProps {
  children?: ReactNode
}

export const Content = ({ children }: ContentProps) => {
  return <main css={contentCss}>{children}</main>
}

const contentCss = css`
  background-color: orange;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  // grid-row-end: 2;
`

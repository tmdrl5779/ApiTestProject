import { height } from '@/data/variables.style'
import { css } from '@emotion/react'

export const GNB = () => {
  return <header css={GNBCss}></header>
}

const GNBCss = css`
  background-color: black;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`

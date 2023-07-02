import { height, width } from '@/data/variables.style'
import { css } from '@emotion/react'

export const SNB = () => {
  return <aside css={SNBCss}></aside>
}

const SNBCss = css`
  background-color: red;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
`

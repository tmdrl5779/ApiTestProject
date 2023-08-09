import { color } from '@/data/variables.style'
import { css } from '@emotion/react'

export const tableCss = css`
  box-sizing: border-box;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  color: ${color.secondaryText};
`

export const tableRowCss = css`
  position: relative;
`

export const tableCellCss = css`
  box-sizing: border-box;
  margin: 0px;
  padding: 6px;
  border: 1px solid ${color.pale};
  text-align: left;
`

export const inputCss = css`
  width: 100%;
  height: 100%;
  background: transparent;
`

export const rowDeleteBtnCss = css`
  position: absolute;
  right: 8px;
  height: 100%;
  width: 20px;
`

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
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: left;
`

export const inputCss = css`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  background: transparent;
  color: ${color.primaryText};
`

export const rowDeleteBtnCss = css`
  border: none;
  outline: none;
  background: transparent;
  position: absolute;
  color: ${color.secondaryText};
  right: 4px;
  height: 100%;
  width: 20px;
`

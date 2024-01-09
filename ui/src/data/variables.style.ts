import { css } from '@emotion/react'
import { Dictionary } from 'common-types'

export const color = {
  accent: '#007acc',
  background: '#121212',
  navBar: '#181818',
  primaryText: '#FFFFFF',
  secondaryText: '#B3B3B3',
  topGradient: '#404040',
  pale: 'rgba(255, 255, 255, 0.1)',
}

export const height = {
  GNB: '64px',
}

export const width = {
  SNB: '12rem',
  SNB_short: '56px',
}

export const overlayScrollBarCss = css`
  &::-webkit-scrollbar-thumb {
    background-color: ${color.topGradient};
    border-radius: 100px;
  }
`

export const overlayScrollBarYCss = css`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  ${overlayScrollBarCss}
`

export const overlayScrollBarXCss = css`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 4px;
  }
  ${overlayScrollBarCss}
`

export const methodColor: Dictionary<string> = {
  GET: '#90ee90',
  POST: 'yellow',
  PUT: 'blue',
  PATCH: 'skyblue',
  DELETE: 'orange',
}

export const statusColor: Dictionary<string> = {
  GOOD: '#90ee90',
  WARNING: 'yellow',
  BAD: 'orange',
  FAIL: '#e23636',
}

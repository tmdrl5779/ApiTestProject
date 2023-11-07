import { css } from '@emotion/react'

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
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${color.topGradient};
    border-radius: 100px;
  }
`

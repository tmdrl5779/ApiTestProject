import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { CSSProperties, JSXElementConstructor, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  style?: CSSProperties
}

export const Layout = ({ children, style }: LayoutProps): JSX.Element => {
  return (
    <section css={layoutCss} style={style}>
      {children}
    </section>
  )
}

const layoutCss = css`
  display: flex;
  flex: auto;
  flex-direction: column;
  background: ${color.background};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 14px;
  box-sizing: border-box;
`

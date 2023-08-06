import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { ChangeEventHandler, memo } from 'react'

export interface InputProps {
  onChange: ChangeEventHandler
  style?: React.CSSProperties
  className?: string
  value: string
}

const Input: React.FC<InputProps> = ({ onChange, style, className, value }) => {
  return <input className={className} style={style} value={value} onChange={onChange} css={inputCss} />
}

const memoizedInput = memo(Input)

export { memoizedInput as Input }

const inputCss = css`
  background: ${color.topGradient};
  color: ${color.primaryText};
  border: none;
  outline: none;
  padding: 0 12px;
  font-size: 14px;
`

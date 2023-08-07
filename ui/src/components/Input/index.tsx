import { color } from '@/data/variables.style'
import { css, SerializedStyles } from '@emotion/react'
import { ChangeEventHandler, memo } from 'react'

export interface InputProps {
  onChange: ChangeEventHandler
  css?: SerializedStyles
  style?: React.CSSProperties
  className?: string
  placeholder?: string
  name?: string
  autoComplete?: string
  value: string
}

const Input: React.FC<InputProps> = ({ onChange, css, style, className, placeholder, name, autoComplete, value }) => {
  return (
    <input
      className={className}
      style={style}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      autoComplete={autoComplete}
      css={css ? [css, inputCss] : inputCss}
    />
  )
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

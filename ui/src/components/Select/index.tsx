import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { ChangeEventHandler, memo } from 'react'
import { ComponentCommonProps } from '../types'

export interface SelectProps extends ComponentCommonProps {
  children: React.ReactNode
  onChange?: ChangeEventHandler
}

// TODO: 값 바뀔때마다 모션 드가면 좋을듯 opacity 정도
// memo areEqualProps에 style
const Select: React.FC<SelectProps> = ({ children, onChange, style, className }) => {
  return (
    <select className={className} onChange={onChange} css={selectCss} style={style}>
      {children}
    </select>
  )
}

const memoizedSelect = memo(Select)

export { memoizedSelect as Select }

const selectCss = css`
  background: ${color.topGradient};
  color: ${color.primaryText};
  border: none;
  outline: none;
  font-size: 14px;
  padding: 0 4px;
`

import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { ChangeEventHandler, memo, NamedExoticComponent, useCallback, useEffect } from 'react'
import { ComponentCommonProps, WrappedChangeEventHandler } from '../types'

export interface SelectProps extends ComponentCommonProps {
  items: string[]
  onChange?: WrappedChangeEventHandler
  value?: string
  defaultValue?: string
}

// TODO: 값 바뀔때마다 모션 드가면 좋을듯 opacity 정도
const Select: React.FC<SelectProps> = ({ items, onChange, style, className, value, defaultValue, _css }) => {
  const _onChange: ChangeEventHandler = useCallback(
    e => {
      onChange?.((e.target as HTMLSelectElement)?.value)
    },
    [onChange]
  )

  return (
    <select
      className={className}
      onChange={_onChange}
      css={[selectCss, _css]}
      style={style}
      value={value}
      defaultValue={defaultValue}
    >
      {items.map(item => (
        <Option value={item} key={item}>
          {item}
        </Option>
      ))}
    </select>
  )
}

export interface OptionProps {
  children: React.ReactNode
  value: string
}

const Option: React.FC<OptionProps> = memo(({ children, value }) => {
  return <option value={value}>{children}</option>
})

const selectCss = css`
  background: ${color.topGradient};
  color: ${color.primaryText};
  border: none;
  outline: none;
  font-size: 14px;
  padding: 0 4px;
`

const memoizedSelect = memo(Select)

export { memoizedSelect as Select }

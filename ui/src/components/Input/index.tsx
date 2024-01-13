import { color } from '@/data/variables.style'
import { genearteUUID } from '@/utils'
import { mergeCss } from '@/utils/mergeCss'
import { css, SerializedStyles } from '@emotion/react'
import { motion, MotionProps } from 'framer-motion'
import { ChangeEventHandler, HTMLInputTypeAttribute, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ComponentCommonProps, WrappedChangeEventHandler } from '../types'

export interface InputProps extends ComponentCommonProps {
  onChange: WrappedChangeEventHandler
  placeholder?: string
  name?: string
  autoComplete?: string
  type?: HTMLInputTypeAttribute
  checked?: boolean
  value?: string | number
  min?: number
  max?: number
}

const Input: React.FC<InputProps> = ({
  onChange,
  _css,
  style,
  className,
  placeholder,
  name,
  autoComplete,
  type = 'text',
  value,
  checked,
  min,
  max,
}) => {
  const [uuid, _] = useState(genearteUUID())
  const mergedCss = mergeCss([inputCss, _css, type === 'checkbox' ? checkboxCss : undefined].flatMap(e => e))

  const animation =
    type === 'checkbox'
      ? {
          whileTap: {
            scale: 1.3,
          },
        }
      : {}

  const _onChange: ChangeEventHandler = useCallback(
    e => {
      const targetValue = (e.target as HTMLInputElement).value
      if (type === 'number') {
        ;(e.target as HTMLInputElement).value = targetValue.replace(/(^0+)/, '')
      }
      onChange(targetValue)
    },
    [onChange, type]
  )

  return (
    <>
      <motion.input
        className={className}
        style={style}
        value={value}
        onChange={_onChange}
        checked={checked}
        placeholder={placeholder}
        name={name}
        type={type}
        autoComplete={autoComplete}
        css={mergedCss}
        id={uuid}
        min={min}
        max={max}
        {...animation}
      />
      <label htmlFor={uuid}></label>
    </>
  )
}

const inputCss = css`
  background: ${color.topGradient};
  color: ${color.primaryText};
  border: none;
  outline: none;
  padding: 4px;
  font-size: 14px;
`

const checkboxCss = css`
  accent-color: ${color.primaryText};
  width: 16px;
  height: 16px;
  border-radius: 4px;
`

const memoizedInput = memo(Input)

export { memoizedInput as Input }

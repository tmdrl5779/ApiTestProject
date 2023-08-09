import { color } from '@/data/variables.style'
import { genearteUUID } from '@/utils'
import { mergeCss } from '@/utils/mergeCss'
import { css, SerializedStyles } from '@emotion/react'
import { motion } from 'framer-motion'
import { ChangeEventHandler, HTMLInputTypeAttribute, memo, useEffect, useMemo, useState } from 'react'
import { ComponentCommonProps } from '../types'

export interface InputProps extends ComponentCommonProps {
  onChange: ChangeEventHandler
  placeholder?: string
  name?: string
  autoComplete?: string
  type?: HTMLInputTypeAttribute
  checked?: boolean
  value?: string
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
}) => {
  const [uuid, _] = useState(genearteUUID())
  const mergedCss = mergeCss([inputCss, _css, type === 'checkbox' ? checkboxCss : undefined])
  const animation =
    type === 'checkbox'
      ? {
          whileTap: {
            scale: 1.3,
          },
        }
      : {}
  return (
    <>
      <motion.input
        className={className}
        style={style}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        type={type}
        autoComplete={autoComplete}
        css={mergedCss}
        id={uuid}
        {...animation}
      />
      <label htmlFor={uuid}></label>
    </>
  )
}

const memoizedInput = memo(Input)

export { memoizedInput as Input }

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

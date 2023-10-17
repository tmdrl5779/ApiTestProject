import { LoadingOutlinedIcon } from '@/data/icons'
import { color } from '@/data/variables.style'
import { css, SerializedStyles } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo, MouseEventHandler, ReactNode, useCallback, useTransition } from 'react'
import { ComponentCommonProps } from '../types'

export interface ButtonProps extends ComponentCommonProps {
  onClick: MouseEventHandler
  children?: ReactNode
  disabled?: boolean
  loading?: true
  type?: 'primary' | 'text'
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  style,
  _css,
  className,
  children,
  disabled,
  loading = false,
  type = 'primary',
}) => {
  const [isPending, startTransition] = useTransition()

  const handleClick: MouseEventHandler = useCallback(
    e => {
      startTransition(() => {
        onClick(e)
      })
    },
    [onClick]
  )

  const _disabled = isPending || disabled

  const mergedCss = _css ? [buttonCss, buttonTypeCss[type], _css] : [buttonCss, buttonTypeCss[type]]

  return (
    <motion.button
      onClick={handleClick}
      disabled={_disabled}
      style={style}
      css={mergedCss}
      className={className}
      whileTap={{ scale: 0.9, opacity: 0.7 }}
    >
      {loading ? _disabled ? <LoadingOutlinedIcon /> : null : null}
      {children}
    </motion.button>
  )
}

const memoizedButton = memo(Button)

export { memoizedButton as Button }

const buttonCss = css`
  border: none;
  outline: none;

  font-size: 14px;

  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:disabled):hover,
  &:not(:disabled):active {
    cursor: pointer;
    font-weight: bold;
    // opacity: 0.7;
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`

const buttonTypeCss = {
  primary: css`
    background: ${color.accent};
    color: ${color.primaryText};
  `,
  text: css`
    background: transparent;
    color: ${color.secondaryText};
    &:not(:disabled):hover,
    &:not(:disabled):active {
      color: ${color.primaryText};
      // opacity: 0.7;
    }
  `,
}

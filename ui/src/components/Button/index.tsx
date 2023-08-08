import { LoadingOutlinedIcon } from '@/data/icons'
import { color } from '@/data/variables.style'
import { css, SerializedStyles } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo, MouseEventHandler, ReactNode, useCallback, useTransition } from 'react'

export interface ButtonProps {
  onClick: MouseEventHandler
  style?: React.CSSProperties
  _css?: SerializedStyles
  className?: string
  children?: ReactNode
  disabled?: boolean
  type?: 'primary' | 'text'
}

const Button: React.FC<ButtonProps> = ({ onClick, style, _css, className, children, disabled, type = 'primary' }) => {
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
    <button onClick={handleClick} disabled={_disabled} style={style} css={mergedCss}>
      {_disabled ? <LoadingOutlinedIcon /> : null}
      {children}
    </button>
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
  `,
}

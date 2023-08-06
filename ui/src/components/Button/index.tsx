import { LoadingOutlinedIcon } from '@/data/icons'
import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo, MouseEventHandler, ReactNode, useCallback, useTransition } from 'react'

export interface ButtonProps {
  onClick: MouseEventHandler
  style?: React.CSSProperties
  className?: string
  children?: ReactNode
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ onClick, style, className, children, disabled }) => {
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

  return (
    <button onClick={handleClick} disabled={_disabled} style={style} css={buttonCss}>
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
  background: ${color.accent};
  margin-left: 8px;
  font-size: 14px;
  color: ${color.primaryText};
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

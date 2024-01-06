import { color } from '@/data/variables.style'
import { useDebounce } from '@/hooks/useDebounce'
import { FrownOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { motion, useAnimate } from 'framer-motion'
import { FC, ReactElement, useEffect } from 'react'
import { Button } from '@/components/Button'

// TODO: 에러 유형에 따라 도움말 메핑
const help = '잠시 후 다시 시도해주세요.'

export interface ErrorProps {
  error: Error
  resetErrorBoundary?: () => void
  icon?: ReactElement
}

export const Error: FC<ErrorProps> = ({ error, resetErrorBoundary, icon }) => {
  return (
    <motion.div css={errorCss}>
      <>
        {icon === undefined ? <FrownOutlined rev={'?'} style={{ fontSize: '100px' }} /> : icon}
        <span className="message">{error.message}</span>
        <span className="help">{help}</span>
        {resetErrorBoundary ? <Button onClick={resetErrorBoundary}>새로 고침</Button> : null}
      </>
    </motion.div>
  )
}

const errorCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${color.secondaryText};
  .message {
    margin-top: 16px;
  }
  .help {
    color: ${color.primaryText};
  }
`

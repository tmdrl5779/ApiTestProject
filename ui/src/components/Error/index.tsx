import { color } from '@/data/variables.style'
import { useDebounce } from '@/hooks/useDebounce'
import { FrownOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { motion, useAnimate } from 'framer-motion'
import { FC, ReactElement, useEffect } from 'react'

export interface ErrorProps {
  message?: string
  icon?: ReactElement
}

export const Error: FC<ErrorProps> = ({ message, icon }) => {
  return (
    <motion.div css={errorCss}>
      <>
        {icon === undefined ? <FrownOutlined rev={'?'} style={{ fontSize: '100px' }} /> : icon}
        <span className="message">{message}</span>
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
`

import { FrownOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { FC } from 'react'

export interface EmptyProps {
  message?: string
}

export const Error: FC<EmptyProps> = ({ message }) => {
  return (
    <motion.div css={errorCss} initial={{ y: -10 }} animate={{ y: 0 }}>
      <FrownOutlined rev={'?'} style={{ fontSize: '100px' }} />
      <span className="message">{message}</span>
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
  .message {
    margin-top: 16px;
  }
`

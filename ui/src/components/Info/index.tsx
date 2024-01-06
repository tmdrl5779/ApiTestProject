import { color } from '@/data/variables.style'
import { useDebounce } from '@/hooks/useDebounce'
import { FrownOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { motion, useAnimate } from 'framer-motion'
import { FC, ReactElement } from 'react'

export interface InfoProps {
  icon?: ReactElement
  message: string
}

export const Info: FC<InfoProps> = ({ message, icon }) => {
  return (
    <motion.div css={errorCss}>
      <>
        {icon === undefined ? <InfoCircleOutlined rev={'?'} style={{ fontSize: '100px' }} /> : icon}
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

import { color } from '@/data/variables.style'
import { FieldTimeOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { FC } from 'react'

export interface ProgressProps {
  percent: number
  elapsedTime: number // sec
}

const bodyWidth = 320

export const Progress: FC<ProgressProps> = ({ percent, elapsedTime }) => {
  return (
    <div css={wrapperCss}>
      <span css={textCss}>
        <span>
          {percent}% {percent === 100 ? 'completed' : 'to complete'}
        </span>
        {percent === 100 ? null : (
          <span>
            <FieldTimeOutlined /> {elapsedTime}s
          </span>
        )}
      </span>
      <div css={bodyCss}>
        <motion.div css={barCss} style={{ width: (bodyWidth * percent) / 100 }} layout />
      </div>
    </div>
  )
}

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const textCss = css`
  font-size: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const bodyCss = css`
  width: ${bodyWidth}px;
  margin-top: 4px;
  height: 12px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.3);
`

const barCss = css`
  border-radius: 4px;
  background-color: ${color.primaryText};
  height: 100%;
`

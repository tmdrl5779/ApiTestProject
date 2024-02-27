import { css } from '@emotion/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { ComponentCommonProps } from '../types'

export interface BlinkerProps extends ComponentCommonProps {
  _key: string
  children: ReactNode
}

export const Blinker: React.FC<BlinkerProps> = ({ _key, children, _css, className, style }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={_key}
        css={[blinkerCss, _css]}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={style}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

const blinkerCss = css`
  width: 100%;
  height: 100%;
`

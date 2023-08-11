import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { ComponentCommonProps } from '../types'

export interface BlinkerProps extends ComponentCommonProps {
  _key: string
  children: ReactNode
}

export const Blinker: React.FC<BlinkerProps> = ({ _key, children, _css, style, className }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={_key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        css={_css}
        style={style}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

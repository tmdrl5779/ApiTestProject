import { FC, PropsWithChildren, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { css } from '@emotion/react'
import { color } from '@/data/variables.style'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'

export const useAccordion = () => {
  return useState<false | number>(0)
}

interface AccordionProps extends PropsWithChildren {
  idx: number
  expanded: false | number
  setExpanded: React.Dispatch<React.SetStateAction<false | number>>
  height: string
  title: string | EmotionJSX.Element
}

export const Accordion: FC<AccordionProps> = ({ idx, expanded, setExpanded, height, children, title }) => {
  const isOpen = idx === expanded

  return (
    <>
      <motion.header
        initial={false}
        animate={{ color: isOpen ? color.primaryText : color.secondaryText }}
        onClick={() => setExpanded(isOpen ? false : idx)}
        css={headerCss}
        whileHover={{
          color: color.primaryText,
        }}
      >
        {title}
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            css={sectionCss}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}

const headerCss = css`
  background: ${color.navBar};
  border: 1px solid ${color.pale};
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding: 4px;
  margin-top: 8px;
`

const sectionCss = css`
  padding: 8px;
  border: 1px solid ${color.pale};
  border-radius: 0 0 4px 4px;
`

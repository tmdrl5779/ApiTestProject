import { FC, memo, PropsWithChildren, ReactNode, useEffect, useState } from 'react'
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
  actions?: ReactNode
}

export const Accordion: FC<AccordionProps> = memo(
  ({ idx, expanded, setExpanded, height, children, title, actions }) => {
    const isOpen = idx === expanded

    return (
      <motion.div css={wrapperCss} layoutRoot layoutScroll>
        <motion.header
          initial={false}
          animate={{ color: isOpen ? color.primaryText : color.secondaryText }}
          onClick={() => setExpanded(isOpen ? false : idx)}
          css={headerCss}
          whileHover={{
            color: color.primaryText,
          }}
          layout
          // layoutScroll
        >
          {title}
          {actions ? <>{actions}</> : null}
        </motion.header>
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              // exit="collapsed"
              variants={{
                open: { opacity: 1, height },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.44, 0.22, 0.23, 0.98] }}
              css={sectionCss}
              layout
              // layoutScroll
            >
              {children}
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }
)

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
  // margin-top: 8px;
  // position: relative;
  margin-bottom: 8px;
`

const sectionCss = css`
  padding: 8px;
  border: 1px solid ${color.pale};
  border-radius: 0 0 4px 4px;
`

const wrapperCss = css`
  position: sticky;
`

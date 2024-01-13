import { FC, memo, PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { css } from '@emotion/react'
import { color } from '@/data/variables.style'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'

export const useAccordion = () => {
  return useState<false | string>(false)
}

interface AccordionProps extends PropsWithChildren {
  id: string
  expanded: false | string
  setExpanded: React.Dispatch<React.SetStateAction<false | string>>
  height: string
  title: string | EmotionJSX.Element
  actions?: ReactNode
}

export const Accordion: FC<AccordionProps> = memo(({ id, expanded, setExpanded, height, children, title, actions }) => {
  const isOpen = id === expanded

  return (
    <motion.div
      css={wrapperCss}
      layoutRoot
      layoutScroll
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.header
        initial={false}
        animate={{ color: isOpen ? color.primaryText : color.secondaryText }}
        onClick={() => setExpanded(isOpen ? false : id)}
        css={headerCss}
        whileHover={{
          color: color.primaryText,
        }}
        layout
        layoutScroll
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
            transition={{ duration: 0.6, ease: [0.54, 0.12, 0.23, 0.98] }}
            css={sectionCss}
            // layout
            layoutScroll
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

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

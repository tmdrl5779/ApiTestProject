import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import React, { FC, ReactNode, useCallback, useState } from 'react'

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return { isModalOpen, openModal, closeModal }
}

export const Modal: FC<{ isOpen: boolean; close: () => void; children: ReactNode }> = ({ isOpen, close, children }) => {
  return (
    <>
      {isOpen ? (
        <div css={backDropCss}>
          <motion.div css={contentCss} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {children}
          </motion.div>
        </div>
      ) : null}
    </>
  )
}

const backDropCss = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(2px);
  z-index: 12345;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`

const contentCss = css`
  background: ${color.background};
  color: white;
`

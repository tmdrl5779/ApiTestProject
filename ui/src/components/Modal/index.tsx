import { color } from '@/data/variables.style'
import { CloseOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import React, { FC, ReactNode, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '..'

export const useModal = () => {
  const [modalInfo, setModalInfo] = useState<{
    open: boolean
    content: null | (() => ReactNode)
    footer?: () => ReactNode
  }>({
    open: false,
    content: null,
  })
  const openModal = useCallback((content: () => ReactNode, footer?: () => ReactNode) => {
    setModalInfo({ open: true, content, footer })
  }, [])
  const closeModal = useCallback(() => {
    setModalInfo({ open: false, content: null })
  }, [])

  return { modalInfo, openModal, closeModal }
}

export const Modal: FC<{
  isOpen: boolean
  close: () => void
  content: (() => ReactNode) | null
  footer?: () => ReactNode
}> = ({ isOpen, close, content, footer }) => {
  const onClickBackDrop = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('backDrop')) {
        close()
      }
    },
    [close]
  )

  return (
    <>
      {isOpen ? (
        <>
          {createPortal(
            <div css={backDropCss} className="backDrop" onClick={onClickBackDrop}>
              <motion.div css={wrapperCss}>
                <div css={headerCss}>
                  {footer ? footer?.() : <div />}
                  <Button
                    type="text"
                    onClick={() => {
                      close()
                    }}
                    css={closeButtonCss}
                  >
                    <CloseOutlined />
                  </Button>
                </div>
                <div css={contentCss}>{content ? content?.() : null}</div>
              </motion.div>
            </div>,
            document.body
          )}
        </>
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
  backdrop-filter: blur(10px);
  z-index: 12345;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`

const wrapperCss = css`
  border-radius: 8px;
  border: 1px solid ${color.pale};
  background: ${color.background};
  width: 800px;
  height: 600px;
  padding: 16px;
  color: inherit;
  overflow: hidden;
`

const headerCss = css`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: ${color.primaryText};
`

const closeButtonCss = css`
  font-size: 16px;
`

const contentCss = css`
  width: 100%;
  height: calc(100% - 40px);
`

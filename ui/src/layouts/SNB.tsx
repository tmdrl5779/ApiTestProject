import { DoubleLeftOutlinedIcon, DoubleRightOutlinedIcon } from '@/data/icons'
import { color, width } from '@/data/variables.style'
import { useToggle } from '@/hooks'
import { css } from '@emotion/react'

import { ReactNode, useCallback, useState } from 'react'

export const SNB: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFull, toggleIsFull] = useToggle(true)

  const handleClickBtn = useCallback(() => {
    toggleIsFull()
  }, [toggleIsFull])

  return (
    <aside css={[SNBCss, isFull ? FullSNBCss : ShortSNBCss]}>
      <div css={SNBChildrenCss}>
        {children}{' '}
        <button css={SNBToggleBtnCss} onClick={handleClickBtn}>
          {isFull ? <DoubleLeftOutlinedIcon /> : <DoubleRightOutlinedIcon />}
        </button>
      </div>
    </aside>
  )
}

const FullSNBCss = css`
  flex: 0 0 ${width.SNB};
  max-width: ${width.SNB};
  min-width: ${width.SNB};
  width: ${width.SNB};
`

const ShortSNBCss = css`
  flex: 0 0 ${width.SNB_short};
  max-width: ${width.SNB_short};
  min-width: ${width.SNB_short};
  width: ${width.SNB_short};
`

const SNBCss = css`
  position: relative;
  background: ${color.navBar};
  color: ${color.secondaryText};
  border-right: 1px solid ${color.pale};
  transition: all 0.2s;
`

const SNBChildrenCss = css`
  height: 100%;
  margin-top: -0.1px;
  padding-top: 0.1px;
`

const SNBToggleBtnCss = css`
  background: transparent;
  color: ${color.secondaryText};
  outline: none;
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 4px;
  padding: 4px 0;

  &:hover {
    color: ${color.primaryText};
  }
`

import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { tableHeaders } from '../../../data/constants'
import { rowCss } from './Row'

export const Header = memo(() => {
  return (
    <motion.li css={[rowCss, headerCss]}>
      {tableHeaders.map(header => (
        <motion.div className={`cell ${header}`} key={header}>
          {header === 'included' ? '' : header.toUpperCase()}
        </motion.div>
      ))}
    </motion.li>
  )
})

const headerCss = css`
  font-weight: bold;
  margin-top: 8px;
  width: calc(100% - 6px);
  background: ${color.navBar};
`

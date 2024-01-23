import { color, overlayScrollBarYCss } from '@/data/variables.style'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { ComponentCommonProps } from '../types'

export interface TableProps extends ComponentCommonProps {
  columns: string[]
  data: Array<Array<string | number>>
}

export const Table: FC<TableProps> = ({ columns, data, _css, style }) => {
  return (
    <motion.table css={[tableCss, _css]} style={style}>
      <motion.thead>
        <motion.tr>
          {columns.map((col, idx) => (
            <motion.td key={`${col}-${idx}`}>{col}</motion.td>
          ))}
        </motion.tr>
      </motion.thead>
      <motion.tbody>
        {data.map((row, idx) => (
          <motion.tr key={`${idx}`}>
            {row.map((cell, idx) => (
              <motion.td key={`${cell}-${idx}`}>{cell}</motion.td>
            ))}
          </motion.tr>
        ))}
      </motion.tbody>
    </motion.table>
  )
}

const tableCss = css`
  width: 100%;
  border-collapse: collapse;
  thead tr {
    font-weight: bold;
    background: ${color.navBar};
  }
  td {
    border: 1px solid ${color.pale};
    padding: 8px 16px;
  }
`

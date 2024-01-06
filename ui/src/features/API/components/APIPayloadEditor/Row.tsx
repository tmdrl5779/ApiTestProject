import { WrappedChangeEventHandler } from '@/components'
import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { PayloadItem } from 'common-types'
import { motion } from 'framer-motion'
import { memo, useCallback } from 'react'
import { tableHeaders } from '../../data/constants'
import { PayloadKeys } from '../../types'
import { Cell } from './Cell'

export const Row = memo(
  ({ onChangeCell, data }: { onChangeCell: (key: PayloadKeys, value: string) => void; data: PayloadItem }) => {
    const _onChangeCell: (key: PayloadKeys) => WrappedChangeEventHandler = useCallback(
      key => value => {
        onChangeCell(key, value)
      },
      [onChangeCell]
    )
    return (
      <motion.li css={rowCss}>
        {tableHeaders.map(header => (
          <Cell key={header} header={header} data={data[header]} _onChangeCell={_onChangeCell(header)} />
        ))}
      </motion.li>
    )
  }
)

export const rowCss = css`
  display: flex;
  list-style: none;
  justify-items: stretch;
  & :first-of-type {
    border-left: none;
  }
  & :last-of-type {
    border-right: none;
  }

  .cell {
    display: flex;
    align-items: center;
    border: 1px solid ${color.topGradient};
    padding: 4px 8px;
    height: 40px;
    &.included {
      width: 40px;
    }
    &.key {
      width: 20%;
    }
    &.value {
      width: 30%;
    }
    &.description {
      width: calc(50% - 40px);
    }
  }
`

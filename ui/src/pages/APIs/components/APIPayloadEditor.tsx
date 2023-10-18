import { Input } from '@/components'
import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

const tableHeaders = ['included', 'key', 'value', 'description'] as const

export const APIPayloadEditor = () => {
  return (
    <>
      <motion.ul css={tableCss} layout key="API-payload-editor">
        {new Array(15).fill(1).map(() => (
          <Row />
        ))}
      </motion.ul>
    </>
  )
}

const Row = () => {
  return (
    <motion.li className="row">
      {tableHeaders.map(header => (
        <motion.div className={`cell ${header}`} key={header}>
          {
            <Input
              onChange={e => e}
              style={{ width: '100%', height: '100%', background: 'transparent' }}
              type={header === 'included' ? 'checkbox' : 'text'}
            />
          }
        </motion.div>
      ))}
    </motion.li>
  )
}
const tableCss = css`
  width: 100%;
  height: calc(100% - 40px - 52px - 8px);
  min-height: calc(100% - 40px - 52px - 8px);
  max-height: calc(100% - 40px - 52px - 8px);
  overflow-y: scroll;
  margin: 0;
  margin-top: 8px;
  padding: 0;
  .cell {
    display: flex;
    align-items: center;
    border: 1px solid ${color.topGradient};
    padding: 4px 8px;
  }
  .row {
    display: flex;
    list-style: none;
    justify-items: stretch;

    & :first-child {
      border-left: none;
    }
    & :last-child {
      border-right: none;
    }

    .cell {
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
  }
`

import { Input } from '@/components'
import { color } from '@/data/variables.style'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

const tableHeaders = ['included', 'key', 'value', 'description'] as const

export const APIPayloadEditor = () => {
  return (
    <>
      <Header />
      <motion.ul css={tableCss} layout key="API-payload-editor">
        {new Array(12).fill(1).map(() => (
          <Row />
        ))}
      </motion.ul>
    </>
  )
}

const Header = () => {
  return (
    <motion.li css={[rowCss, headerCss]}>
      {tableHeaders.map(header => (
        <motion.div className={`cell ${header}`} key={header}>
          {header === 'included' ? '' : header.toUpperCase()}
        </motion.div>
      ))}
    </motion.li>
  )
}

const Row = () => {
  return (
    <motion.li css={rowCss}>
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

//TODO: 하드코딩으로 높이 계산 ㄴㄴ flex auto grid 이런걸로 바꾸기
const tableCss = css`
  width: calc(100% + 8px);
  height: calc(100% - 40px - 52px - 8px - 40px);
  min-height: calc(100% - 40px - 52px - 8px - 40px);
  max-height: calc(100% - 40px - 52px - 8px - 40px);
  margin: 0;
  padding: 0;

  // 스크롤바 overlay 세팅
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${color.topGradient};
    border-radius: 100px;
  }
`

const headerCss = css`
  font-weight: bold;
  margin-top: 8px;
`

const rowCss = css`
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

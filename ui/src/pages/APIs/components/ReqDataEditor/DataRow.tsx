import { Button, Input } from '@/components'
import { DeleteOutlinedIcon } from '@/data/icons'
import { capitalize } from '@/utils'
import { getObjectKeys } from '@/utils/ObjectHandler'
import { AnimatePresence, motion, useIsPresent, usePresence } from 'framer-motion'
import { ChangeEvent, ChangeEventHandler, useCallback, useMemo, useState } from 'react'
import { ReqData } from '../../types'
import { inputCss, rowDeleteBtnCss, tableCellCss, tableRowCss } from './styles'

export interface DataRowProps {
  data: ReqData
  idx: number
  onDataInputChange: (idx: number, key: keyof ReqData, value: string | boolean) => void
  deleteData: (idx: number) => void
}

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1, duration: 0.2 }

export const DataRow: React.FC<DataRowProps> = ({ data, idx, onDataInputChange, deleteData }) => {
  const [deletable, setDeletable] = useState(false)

  const [isPresent, safeToRemove] = usePresence()
  const animations = useMemo(
    () => ({
      layout: true,
      initial: 'out',
      animate: isPresent ? 'in' : 'out',
      variants: {
        in: { opacity: 1, scaleY: 1, zIndex: 0 },
        out: { opacity: 0, scaleY: 0, zIndex: -1 },
      },
      onAnimationComplete: () => !isPresent && safeToRemove?.(),
      transition,
    }),
    [isPresent, safeToRemove]
  )

  const onMouseEnter = useCallback(() => {
    if (idx === 0) {
      return
    }
    setDeletable(true)
  }, [idx])

  const onMouseLeave = useCallback(() => setDeletable(false), [])

  const onIncludedChange: ChangeEventHandler = useCallback(
    e => {
      onDataInputChange(idx, 'included', !data['included'])
    },
    [data, idx, onDataInputChange]
  )

  const onDataValueChange: (key: keyof ReqData) => ChangeEventHandler = useCallback(
    key => e => {
      const target = e.target as HTMLInputElement
      onDataInputChange(idx, key, target.value)
    },
    []
  )

  const { included, uuid, ...dataToShow } = data

  return (
    <motion.tr
      {...animations}
      style={{
        position: isPresent ? 'relative' : 'absolute',
      }}
      key={data.uuid}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      css={tableRowCss}
    >
      {isPresent ? (
        <>
          <td css={tableCellCss} style={{ width: '4%', textAlign: 'center' }}>
            <Input type="checkbox" checked={data['included']} onChange={onIncludedChange} />
          </td>
          {getObjectKeys(dataToShow).map(key => (
            <td key={`data-${idx}-${key}`} css={tableCellCss} style={{ width: '32%' }}>
              <Input
                css={inputCss}
                name={key}
                value={data[key] as string}
                onChange={onDataValueChange(key)}
                autoComplete="off"
              />
            </td>
          ))}
          {deletable ? (
            <Button
              type="text"
              _css={rowDeleteBtnCss}
              onClick={e => {
                e.preventDefault()
                deleteData(idx)
              }}
            >
              <DeleteOutlinedIcon />
            </Button>
          ) : null}
        </>
      ) : null}
    </motion.tr>
  )
}

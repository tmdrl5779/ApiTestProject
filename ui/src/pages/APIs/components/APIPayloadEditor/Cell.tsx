import { Input, WrappedChangeEventHandler } from '@/components'
import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { PayloadKeys } from '../../types'

export const Cell = memo(
  ({
    header,
    _onChangeCell,
    data,
  }: {
    header: PayloadKeys
    _onChangeCell: WrappedChangeEventHandler
    data: string | boolean
  }) => {
    return (
      <motion.div className={`cell ${header}`} key={header}>
        {
          <Input
            onChange={_onChangeCell}
            checked={header === 'included' ? (data as boolean) : undefined}
            value={header === 'included' ? undefined : (data as string)}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            type={header === 'included' ? 'checkbox' : 'text'}
          />
        }
      </motion.div>
    )
  }
)

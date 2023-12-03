import { useMemo } from 'react'
export const useObjectEntries = (obj: object | null) => {
  const entries = useMemo(() => (obj === null ? [] : Object.entries(obj)), [obj])
  return entries
}

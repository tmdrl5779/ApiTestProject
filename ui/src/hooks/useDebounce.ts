import { useRef } from 'react'

interface UseDebounce {
  ({ callback, timeout }: { callback: (...args: any) => any; timeout: number }): (...args: any) => any
}

export const useDebounce: UseDebounce = ({ callback, timeout }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  return (...args: any) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    timerRef.current = setTimeout(() => {
      callback(args)
    }, timeout)
  }
}

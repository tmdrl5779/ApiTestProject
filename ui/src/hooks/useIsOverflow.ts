import { RefObject, useLayoutEffect, useState } from 'react'

export const useIsOverflow = <T extends HTMLElement>(
  ref: RefObject<T>,
  isVerticalOverflow?: boolean,
  callback?: (...args: any) => void
): boolean => {
  const [isOverflow, setIsOverflow] = useState(false)

  useLayoutEffect(() => {
    const { current } = ref

    if (current) {
      console.log('좀 대라')
      const { clientWidth, scrollWidth, clientHeight, scrollHeight } = current
      const trigger = () => {
        const hasOverflow = isVerticalOverflow ? scrollHeight > clientHeight : scrollWidth > clientWidth
        setIsOverflow(hasOverflow)
        callback?.(hasOverflow)
      }
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current)
      }
      trigger()
    }
  }, [callback, ref, isVerticalOverflow])

  return isOverflow
}

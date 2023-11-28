import { RefObject, useLayoutEffect, useState } from 'react'

export const useIsOverflow = <T extends HTMLElement>(
  ref: RefObject<T>,
  isVerticalOverflow?: boolean,
  dep?: any,
  weight?: number,
  callback?: (...args: any) => void
): boolean => {
  const [isOverflow, setIsOverflow] = useState(false)

  useLayoutEffect(() => {
    const { current } = ref

    if (current) {
      const { clientWidth, scrollWidth, clientHeight, scrollHeight } = current
      const trigger = () => {
        const hasOverflow = isVerticalOverflow
          ? (isOverflow ? scrollHeight - (weight ? weight : 0) : scrollHeight) > clientHeight
          : (isOverflow ? scrollWidth - (weight ? weight : 0) : scrollWidth) > clientWidth

        setIsOverflow(hasOverflow)
        callback?.(hasOverflow)
      }
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current)
      }
      trigger()
    }
  }, [callback, ref, isVerticalOverflow, dep, weight])

  return isOverflow
}

import { useState } from 'react'

export const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initialValue)
  const toggle = () => {
    setState(prev => !prev)
  }
  return [state, toggle]
}

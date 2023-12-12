import { SerializedStyles } from '@emotion/react'

export interface StyleProps {
  _css?: SerializedStyles | SerializedStyles[]
  style?: React.CSSProperties
}

export interface ComponentCommonProps extends StyleProps {
  className?: string
}

export type WrappedChangeEventHandler = (value: string) => void

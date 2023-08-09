import { SerializedStyles } from '@emotion/react'

export interface StyleProps {
  _css?: SerializedStyles
  style?: React.CSSProperties
}

export interface ComponentCommonProps extends StyleProps {
  className?: string
}

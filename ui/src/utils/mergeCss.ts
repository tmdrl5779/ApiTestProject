import { SerializedStyles } from '@emotion/react'

export const mergeCss: (cssArr: Array<SerializedStyles | undefined>) => SerializedStyles[] = cssArr => {
  return cssArr.filter(css => css !== undefined) as SerializedStyles[]
}

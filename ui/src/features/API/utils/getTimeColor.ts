import { statusColor } from '@/data/variables.style'

export const getTimeColor = (time: number) => {
  if (time < 1000) {
    return statusColor.GOOD
  } else if (time < 2000) {
    return statusColor.WARNING
  } else if (time < 3000) {
    return statusColor.BAD
  }
  return statusColor.FAIL
}

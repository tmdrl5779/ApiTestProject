import { statusColor } from '@/data/variables.style'

export const getStatusColor = (status: string) => {
  if (status.startsWith('2')) {
    return statusColor.GOOD
  } else if (status.startsWith('3')) {
    return statusColor.WARNING
  } else if (status.startsWith('4')) {
    return statusColor.BAD
  }
  return statusColor.FAIL
}

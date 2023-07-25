import { createContext } from '@/utils/RobustContext'

export interface IFunnelContext {
  step: string
}

export const FunnelContext = createContext<IFunnelContext>()
FunnelContext.displayName = 'FunnelContext'

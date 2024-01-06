import { useContext } from '@/utils/RobustContext'
import { useState } from 'react'
import { FunnelContext } from './FunnelContext'

export interface FunnelProps {
  step: string
  children: React.ReactNode
}

export interface FunnelComposition {
  Step: typeof Step
}

export const Funnel: React.FC<FunnelProps> & FunnelComposition = ({ step, children }) => {
  return <FunnelContext.Provider value={{ step }}>{children}</FunnelContext.Provider>
}

export interface StepProps {
  name: string
  children: React.ReactNode
}

export const Step: React.FC<StepProps> = ({ name, children }) => {
  const { step } = useContext(FunnelContext)
  return <>{step === name ? children : null}</>
}

Funnel.Step = Step

import React from 'react'
import { appThemeDefault } from '@constants/ui'

export const AppThemeContext = React.createContext(appThemeDefault)
export const AppContainerContext =
  React.createContext<React.RefObject<HTMLDivElement> | null>(null)

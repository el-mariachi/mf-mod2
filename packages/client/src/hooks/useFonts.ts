import { useState } from 'react'

export const useFonts = (_isLoaded: boolean) => {
  const [isLoaded, setIsLoaded] = useState(_isLoaded)
  if (process.env.CUSTOM_SSR === 'CUSTOM_SSR') {
    return true
  }
  document.fonts.ready.then(res => {
    if (res.status === 'loaded') {
      setIsLoaded(true)
    }
  })
  return isLoaded
}

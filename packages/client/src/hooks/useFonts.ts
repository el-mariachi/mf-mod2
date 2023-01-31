import { useState } from 'react'

export const useFonts = (_isLoaded: boolean) => {
  const [isLoaded, setIsLoaded] = useState(_isLoaded)

  document.fonts.ready.then(res => {
    if (res.status === 'loaded') {
      setIsLoaded(true)
    }
  })

  return isLoaded
}

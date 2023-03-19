import { useEffect, useState } from 'react'
import { defaultMapSize } from '@constants/game'
import { Size } from '@type/game'

export const useWinSize = (initialSize = defaultMapSize) => {
  const [size, setSize] = useState(initialSize)

  let resized: NodeJS.Timeout
  const windowResizeHandler = (e: Event) => {
    const targetWindow = e.currentTarget as Window
    // wait for the end of resizing
    clearTimeout(resized)
    resized = setTimeout(
      () =>
        setSize([targetWindow.innerWidth, targetWindow.innerHeight] as Size),
      100
    )
  }

  useEffect(() => {
    setSize([window.innerWidth, window.innerHeight] as Size)
    window.addEventListener('resize', windowResizeHandler)
    return () => {
      window.removeEventListener('resize', windowResizeHandler)
    }
  }, [])

  return size
}

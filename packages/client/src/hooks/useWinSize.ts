import { useEffect, useState } from 'react'
import { defaultMapSize } from '@constants/game'

type Center = {
  width: number
  height: number
}

interface CalcCenter {
  (width: number, height: number): Center
}

const calcCenter: CalcCenter = (width, height) => ({
  width: Math.floor(width / 2),
  height: Math.floor(height / 2),
})

// Расчет центра сделан для совместимости; его лучше брать из canvas-контекста; надеюсь уже везде переделано

interface WinSize {
  (initialWidth?: number, initialHeight?: number): [number, number, Center]
}

export const useWinSize: WinSize = (
  initialWidth = defaultMapSize.width,
  initialHeight = defaultMapSize.height
) => {
  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(initialHeight)
  const [center, setCenter] = useState(calcCenter(width, height))

  const windowResizeHandler = (e: Event) => {
    const targetWindow = e.currentTarget as Window
    setWidth(targetWindow.innerWidth)
    setHeight(targetWindow.innerHeight)
    setCenter(calcCenter(width, height))
  }
  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    window.addEventListener('resize', windowResizeHandler)
    return () => {
      window.removeEventListener('resize', windowResizeHandler)
    }
  }, [])
  return [width, height, center]
}

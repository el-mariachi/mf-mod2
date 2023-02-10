import Canvas from '@components/Canvas'
import { useEffect, useState } from 'react'
import { drawSpinner } from './drawSpinner'

const Spinner = () => {
  const initialWidth = 384
  const initialHeight = 672
  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(initialHeight)

  const windowResizeHandler = (e: Event) => {
    const targetWindow = e.currentTarget as Window
    setWidth(targetWindow.innerWidth)
    setHeight(targetWindow.innerHeight)
  }
  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    window.addEventListener('resize', windowResizeHandler)
    return () => {
      window.removeEventListener('resize', windowResizeHandler)
    }
  }, [])
  return <Canvas draw={drawSpinner} width={width} height={height} />
}

export default Spinner

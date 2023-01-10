import { useRef, useEffect } from 'react'
import { Draw } from '../components/Canvas/Canvas'

const useCanvas = (draw: Draw) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      if (ctx !== null) {
        draw(ctx)
      }
    }
  }, [draw])
  return canvasRef
}

export default useCanvas

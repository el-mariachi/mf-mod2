import { useRef, useEffect } from 'react'

const useCanvas = (draw: (context: CanvasRenderingContext2D) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    if (context) {
      draw(context)
    }
  }, [draw])

  return canvasRef
}
export default useCanvas

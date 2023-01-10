import { useRef, useEffect } from 'react'
import { Draw } from '../components/Canvas/Canvas'

const useCanvas = (draw: Draw) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      let animationFrameId: number

      const render = () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        draw(ctx!)
        animationFrameId = window.requestAnimationFrame(render)
      }

      if (ctx !== null) {
        render()
      }
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [draw])
  return canvasRef
}

export default useCanvas

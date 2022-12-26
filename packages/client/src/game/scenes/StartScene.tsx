import { useEffect, useRef } from 'react'
import { CanvasProps } from '../../types/CanvasProps'

function StartScene({ width, height }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.rect(0, 0, width, height)
        ctx.fillStyle = 'black'
        ctx.fill()
        ctx.font = '48px'
        ctx.fillStyle = 'white'
        ctx.fillText('One bit journey', width / 2, height / 2)
      }
    }
  }, [])
  return <canvas ref={canvasRef} width={width} height={height}></canvas>
}

export default StartScene

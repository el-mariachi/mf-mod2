import { useEffect, useRef } from 'react'
import { CanvasProps } from '../../types/CanvasProps'
import '../../assets/fonts/minecraft/minecraft.css'

function StartScene({ width, height }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const centerWidth = width / 2
  const centerHeight = height / 2
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, width, height)

        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.font = '48px Minecraft'
        ctx.fillText('One Bit', centerWidth, centerHeight)

        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.font = '40px Minecraft'
        ctx.fillText('Journey', centerWidth, centerHeight + 45)

        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.font = '24px Minecraft'
        ctx.fillText('loading...', centerWidth, centerHeight + 115)

        ctx.strokeStyle = 'white'
        ctx.strokeRect(centerWidth - 80, centerHeight + 140, 165, 15)

        ctx.fillStyle = 'white'
        ctx.fillRect(centerWidth - 80, centerHeight + 140, 15, 15)
      }
    }
  }, [])
  return <canvas ref={canvasRef} width={width} height={height}></canvas>
}

export default StartScene

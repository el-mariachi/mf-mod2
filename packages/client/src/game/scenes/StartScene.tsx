import { useEffect, useRef } from 'react'
import { CanvasProps } from '../../types/CanvasProps'
import '../../assets/fonts/minecraft/minecraft.css'

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

        ctx.font = '48px Minecraft'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText('One Bit', width / 2, height / 2)

        ctx.font = '40px Minecraft'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText('Journey', width / 2, height / 2 + 45)

        ctx.font = '24px Minecraft'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText('loading...', width / 2, height / 2 + 145)
      }
    }
  }, [])
  return <canvas ref={canvasRef} width={width} height={height}></canvas>
}

export default StartScene

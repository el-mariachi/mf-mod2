import { useEffect, useRef, useState } from 'react'
import { ProgressBar } from '../../animations/ProgressBar'
function StartScene() {
  const width = window.innerWidth
  const height = window.innerHeight
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const centerWidth = width / 2
  const centerHeight = height / 2
  const [fontLoaded, setFontLoaded] = useState(false)
  document.fonts.ready.then(res => {
    if (res.status === 'loaded') {
      setFontLoaded(true)
    }
  })
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const progressBar: ProgressBar = new ProgressBar({
        color: 'white',
        ctx,
        x: centerWidth - 80,
        y: centerHeight + 140,
        width: 165,
        heigth: 15,
      })
      if (ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, width, height)
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.font = '700 48px Minecraft'
        ctx.fillText('One Bit', centerWidth, centerHeight)
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.font = '700 40px Minecraft'
        ctx.fillText('Journey', centerWidth, centerHeight + 45)
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.font = '400 24px Minecraft'
        ctx.fillText('loading...', centerWidth, centerHeight + 115)
        progressBar.draw()
      }
    }
  }, [fontLoaded])

  return <canvas ref={canvasRef} width={width} height={height}></canvas>
}

export default StartScene

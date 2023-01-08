import { useEffect, useRef, useState } from 'react'
import ResultsProps from '../Props/ResultsProps'
import './ResSceneStyle.scss'

function ResScene({ levelNum, killCount, coins, time }: ResultsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const centerWidth = window.innerWidth / 2
  let curHeight = window.innerHeight / 4 - 50
  const margin = window.innerWidth * 0.4 > 200 ? 200 : window.innerWidth * 0.4
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
      if (ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, centerWidth, window.innerHeight)
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.font = `600 40px Minecraft`
        ctx.fillText(`Level ${levelNum}`, centerWidth, curHeight)
        curHeight += 25
        curHeight += 48
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'left'
        ctx.font = ' 400 24px Minecraft'
        ctx.fillText('killed enemies', centerWidth - margin, curHeight)
        ctx.textAlign = 'right'
        ctx.fillText(killCount.toString(), centerWidth + margin, curHeight)
        curHeight += 24 * 2
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'left'
        ctx.font = ' 400 24px Minecraft'
        ctx.fillText('gathered coins', centerWidth - margin, curHeight)
        ctx.textAlign = 'right'
        ctx.fillText(coins.toString(), centerWidth + margin, curHeight)
        curHeight += 24 * 2
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'left'
        ctx.font = '400 24px Minecraft'
        ctx.fillText('time wasted', centerWidth - margin, curHeight)
        ctx.textAlign = 'right'
        ctx.fillText(time, centerWidth + margin, curHeight)
        curHeight += 24 * 2
      }
    }
  }, [fontLoaded])

  return (
    <div className="results">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight / 2}></canvas>
      <div className="res-buttons-sect">
        <a className="mx-auto text-white">restart</a>
        <a className="mx-auto text-white">exit</a>
      </div>
    </div>
  )
}

export default ResScene

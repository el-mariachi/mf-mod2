import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../../../store'
import './index.css'

const { finishLevel } = actions
function LoadScene({ onExit }: { onExit: () => void }) {
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

  const dispatch = useDispatch()
  const onGameFinish = () => {
    dispatch(finishLevel({ time: 0 }))
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, width, height)

        const image = new Image()
        image.src = '/src/assets/game_level_1_items.png'
        image.onload = function () {
          ctx.drawImage(image, centerWidth - 200, 180)
        }
      }
    }
  }, [fontLoaded])

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
      <div className="map-scene_buttons">
        <a className="mx-auto text-white" onClick={onGameFinish}>
          finish game
        </a>
        <a className="mx-auto text-white" onClick={onExit}>
          exit
        </a>
      </div>
    </>
  )
}

export default LoadScene

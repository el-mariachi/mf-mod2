import { useEffect, useRef } from 'react'
import { useFonts } from '@hooks/useFonts'
import { useAppDispatch } from 'hooks/redux_typed_hooks'
import { finishLevel } from '@store/slices/game'
import { useWinSize } from '@hooks/useWinSize'
import './MapScene.css'

function LoadScene({ onExit }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fontLoaded = useFonts(false)
  const [width, height, center] = useWinSize()

  const dispatch = useAppDispatch()
  const onGameFinish = () => {
    dispatch(finishLevel())
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
          ctx.drawImage(image, center.width - 200, 180)
        }
      }
    }
  }, [fontLoaded])

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
      <div className="map-scene__buttons">
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

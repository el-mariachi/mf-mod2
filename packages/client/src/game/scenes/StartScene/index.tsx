import { useEffect, useRef } from 'react'
import { useFonts } from '@hooks/useFonts'
import { useDispatch } from 'react-redux'
import { actions } from '@store'
import { width, height, center } from '@utils/winsize'
import { Text } from '@utils/fillCanvas'
import './StartScene.scss'

const { startGame } = actions
function StartScene({ onExit }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fontLoaded = useFonts(false)

  const dispatch = useDispatch()
  const onGameStart = () => {
    dispatch(startGame())
  }
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      if (ctx) {
        const text = new Text({
          ctx,
          textBaseline: 'middle',
          fillStyle: 'white',
          textAlign: 'center',
          font: '700 48px Minecraft',
        })

        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, width, height)
        text.fill('One Bit', center.width, center.height)
        text.fill('Dungeon', center.width, center.height + 45, {
          font: '700 40px Minecraft',
        })
      }
    }
  }, [fontLoaded])

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
      <div className="start-scene__buttons">
        <a className="mx-auto text-white" onClick={onGameStart}>
          start game
        </a>
        <a className="mx-auto text-white" onClick={onExit}>
          exit
        </a>
      </div>
    </>
  )
}

export default StartScene

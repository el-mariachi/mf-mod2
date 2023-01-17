import { useEffect, useRef } from 'react'
import { useFonts } from '../../../hooks/useFonts'
import { useDispatch } from 'react-redux'
import { actions } from '../../../store'
import './StartScene.scss'

const { startGame } = actions
function StartScene({ onExit }: SceneProps) {
  const width = window.innerWidth
  const height = window.innerHeight
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const centerWidth = width / 2
  const centerHeight = height / 2
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
        ctx.fillText('Dungeon', centerWidth, centerHeight + 45)
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

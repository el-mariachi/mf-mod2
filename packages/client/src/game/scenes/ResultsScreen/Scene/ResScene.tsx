import { useEffect, useRef } from 'react'
import SecondsToHMS from '../../../../utils/secondsFormat'
import { useFonts } from '../../../../hooks/useFonts'
import './ResScene.scss'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../../../store'
import { levelStats } from '../../../../store/selectors'

const { restartGame } = actions
function _RenderStroke(
  ctx: CanvasRenderingContext2D,
  lStr: string,
  rStr: string,
  centerWidth: number,
  margin: number,
  curHeight: number
) {
  ctx.textAlign = 'left'
  ctx.fillText(lStr, centerWidth - margin, curHeight)
  ctx.textAlign = 'right'
  ctx.fillText(rStr, centerWidth + margin, curHeight)
}

function ResScene({ onExit }: SceneProps) {
  const lvlStats = useSelector(levelStats) || {
    levelNum: 1,
    killCount: 0,
    coins: 0,
    time: 0,
    steps: 0,
  }
  const { levelNum, killCount, coins, time, steps } = lvlStats
  const dispatch = useDispatch()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const centerWidth = window.innerWidth / 2
  let curHeight = window.innerHeight / 4
  const margin = window.innerWidth * 0.4 > 200 ? 200 : window.innerWidth * 0.4
  const fontLoaded = useFonts(false)

  const formatTime = SecondsToHMS(time)

  const onRestart = () => {
    dispatch(restartGame())
  }

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
        ctx.font = ' 400 24px Minecraft'

        _RenderStroke(
          ctx,
          'killed enemies',
          killCount.toString(),
          centerWidth,
          margin,
          curHeight
        )
        curHeight += 24 * 2

        _RenderStroke(
          ctx,
          'gathered coins',
          coins.toString(),
          centerWidth,
          margin,
          curHeight
        )
        curHeight += 24 * 2

        _RenderStroke(
          ctx,
          'time spent',
          formatTime,
          centerWidth,
          margin,
          curHeight
        )
        curHeight += 24 * 2

        _RenderStroke(
          ctx,
          'steps',
          steps.toString(),
          centerWidth,
          margin,
          curHeight
        )
        curHeight += 24 * 2
      }
    }
  }, [fontLoaded, levelStats])

  return (
    <div className="res-scene__results">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={curHeight + 265}></canvas>
      <div className="res-scene__buttons">
        <a className="mx-auto text-white" onClick={onRestart}>
          restart
        </a>
        <a className="mx-auto text-white" onClick={onExit}>
          exit
        </a>
      </div>
    </div>
  )
}

export default ResScene

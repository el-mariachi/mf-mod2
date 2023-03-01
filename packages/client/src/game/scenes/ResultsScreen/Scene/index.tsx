import { useEffect, useRef } from 'react'
import SecondsToHMS from '@utils/secondsFormat'
import { useFonts } from '@hooks/useFonts'
import './ResScene.scss'
import { useAppSelector, useAppDispatch } from 'hooks/redux_typed_hooks'
import { resumeGame } from '@store/slices/game'
import { selectGameTotals } from '@store/selectors'
import { width, height, center } from '@utils/winsize'

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
  const { levelNum, gameTotals } = useAppSelector(selectGameTotals)
  const { killCount, coins, time, steps } = gameTotals
  const dispatch = useAppDispatch()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let curHeight = height / 4
  const margin = width * 0.4 > 200 ? 200 : width * 0.4
  const fontLoaded = useFonts(false)

  const formatTime = SecondsToHMS(time)

  const onRestart = () => {
    dispatch(resumeGame())
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, center.width, height)
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.font = `600 40px Minecraft`
        ctx.fillText(`Level ${levelNum}`, center.width, curHeight)
        curHeight += 25
        curHeight += 48
        ctx.font = ' 400 24px Minecraft'

        _RenderStroke(
          ctx,
          'killed enemies',
          killCount.toString(),
          center.width,
          margin,
          curHeight
        )
        curHeight += 24 * 2

        _RenderStroke(
          ctx,
          'gathered coins',
          coins.toString(),
          center.width,
          margin,
          curHeight
        )
        curHeight += 24 * 2

        _RenderStroke(
          ctx,
          'time spent',
          formatTime,
          center.width,
          margin,
          curHeight
        )
        curHeight += 24 * 2

        _RenderStroke(
          ctx,
          'steps',
          steps.toString(),
          center.width,
          margin,
          curHeight
        )
        curHeight += 24 * 2
      }
    }
  }, [fontLoaded, gameTotals])

  return (
    <div className="res-scene__results">
      <canvas ref={canvasRef} width={width} height={curHeight + 265}></canvas>
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

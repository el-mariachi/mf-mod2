import { useEffect, useRef } from 'react'
import SecondsToHMS from '@utils/secondsFormat'
import { useFonts } from '@hooks/useFonts'
import './ResScene.scss'
import { useAppSelector, useAppDispatch } from 'hooks/redux_typed_hooks'
import { restartLevel, nextLevel, startGame } from '@store/slices/game'
import {
  selectGameTotals,
  selectHeroIsDead,
  selectPlayAgain,
  selectContinue,
} from '@store/selectors'
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
  const heroIsDead = useAppSelector(selectHeroIsDead)
  const showPlayAgainButton = useAppSelector(selectPlayAgain)
  const showContinueButton = useAppSelector(selectContinue)
  const { killCount, coins, time, steps } = gameTotals
  const dispatch = useAppDispatch()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let curHeight = height / 4
  const margin = width * 0.4 > 200 ? 200 : width * 0.4
  const fontLoaded = useFonts(false)

  const formatTime = SecondsToHMS(time)

  const restartCurrentLevel = () => {
    // TODO reset game controllers to level start
    dispatch(restartLevel())
  }

  const startNextLevel = () => {
    dispatch(nextLevel)
  }

  const playAgain = () => {
    dispatch(startGame)
  }

  const resumeFromSaved = () => {
    // TODO
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
          String(killCount),
          center.width,
          margin,
          curHeight
        )
        curHeight += 24 * 2

        _RenderStroke(
          ctx,
          'gathered coins',
          String(coins),
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
          String(steps),
          center.width,
          margin,
          curHeight
        )
        curHeight += 24 * 2
      }
    }
  }, [fontLoaded, selectGameTotals])

  return (
    <div className="res-scene__results">
      <canvas ref={canvasRef} width={width} height={curHeight + 265}></canvas>
      <div className="res-scene__buttons">
        {showContinueButton ? (
          <a className="mx-auto text-white" onClick={playAgain}>
            continue
          </a>
        ) : null}
        {showPlayAgainButton ? (
          <a className="mx-auto text-white" onClick={startNextLevel}>
            play again
          </a>
        ) : null}
        <a className="mx-auto text-white" onClick={restartCurrentLevel}>
          restart level
        </a>
        {/* TODO uncomment when savepoints are available */}
        {/* {heroIsDead ? (
          <a className="mx-auto text-white" onClick={resumeFromSaved}>
            resume from saved
          </a>
        ) : null} */}
        <a className="mx-auto text-white" onClick={onExit}>
          exit
        </a>
      </div>
    </div>
  )
}

export default ResScene

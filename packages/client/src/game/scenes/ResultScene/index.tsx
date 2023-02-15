import * as UI from '@constants/ui'
import { Coords } from '@game/core/types'
import SecondsToHMS from '@game/utils/secondsFormat'
import { useAppSelector, useAppDispatch } from 'hooks/redux_typed_hooks'
import { restartLevel, nextLevel, startGame } from '@store/slices/game'
import {
  selectGameTotals,
  selectHeroIsDead,
  selectPlayAgain,
  selectContinue,
  levelStats,
  selectLevelScore,
} from '@store/selectors'
import { width, height, center } from '@utils/winsize'
import SceneCanvas from '@game/components/SceneCanvas'
import GameUIButton from '@game/components/GameUIButton'
import './ResultScene.scss'

const margin = width * 0.4 > 200 ? 200 : width * 0.4
function _RenderStroke(
  ctx: CanvasRenderingContext2D,
  lStr: string,
  rStr: string,
  coords: Coords,
  bold = false
) {
  ctx.fillStyle = UI.COLOR_ALMOST_WHITE
  ctx.font = `${bold ? '700' : '400'} 24px Minecraft`
  ctx.textAlign = 'left'
  ctx.fillText(lStr, coords[0] - margin, coords[1])
  ctx.textAlign = 'right'
  ctx.fillText(rStr, coords[0] + margin, coords[1])
}

function ResultScene({ onExit }: SceneProps) {
  const { levelNum, gameTotals } = useAppSelector(selectGameTotals)
  const heroIsDead = useAppSelector(selectHeroIsDead)
  const showPlayAgainButton = useAppSelector(selectPlayAgain)
  const showContinueButton = useAppSelector(selectContinue)
  const score = useAppSelector(selectLevelScore)
  const { killCount, coins, time, steps } = useAppSelector(levelStats)
  const dispatch = useAppDispatch()
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

  const isLevelCompleted = !heroIsDead
  const isGameCompleted = !showContinueButton
  const resultMessage = !isLevelCompleted
    ? 'Oops, you`re failed'
    : !isGameCompleted
      ? 'Level completed'
      : 'Game completed!'
  const sceneDrawer: CanvasDrawingFunction = ctx => {
    let curHeight = height / 2

    ctx.textAlign = 'center'
    ctx.fillStyle = UI.COLOR_ALMOST_WHITE
    ctx.font = '700 28px Minecraft'

    curHeight -= 207
    ctx.fillText(`Level ${levelNum}:`, center.width, curHeight)

    ctx.fillStyle = isLevelCompleted
      ? UI.COLOR_YELLOW
      : UI.COLOR_DIRTY_PINK
    ctx.font = `700 ${isLevelCompleted ? '43px' : '36px'} Minecraft`

    curHeight += 40
    ctx.fillText(resultMessage, center.width, curHeight)

    curHeight += 24 * 2 + 25
    _RenderStroke(ctx, 'score', String(score), [center.width, curHeight], true)

    curHeight += 24 * 2
    _RenderStroke(ctx, 'killed enemies', String(killCount), [
      center.width,
      curHeight,
    ])

    curHeight += 24 * 2
    _RenderStroke(ctx, 'gathered coins', String(coins), [
      center.width,
      curHeight,
    ])

    curHeight += 24 * 2
    _RenderStroke(ctx, 'time spent', formatTime, [center.width, curHeight])

    curHeight += 24 * 2
    _RenderStroke(ctx, 'steps', String(steps), [center.width, curHeight])
  }

  return (
    <div className="res-scene__results">
      <SceneCanvas draw={sceneDrawer} width={width} height={100 + height / 2}>
        <div className="res-scene__buttons mt-4">
          {showContinueButton ? (
            <GameUIButton className="mx-auto" onClick={playAgain}>
              continue
            </GameUIButton>
          ) : null}
          {showPlayAgainButton ? (
            <GameUIButton className="mx-auto" onClick={startNextLevel}>
              play again
            </GameUIButton>
          ) : null}
          <GameUIButton className="mx-auto" onClick={restartCurrentLevel}>
            restart level
          </GameUIButton>
          {/* TODO uncomment when savepoints are available */}
          {/* {heroIsDead ? (
          <a className="mx-auto" onClick={resumeFromSaved}>
            resume from saved
          </a>
        ) : null} */}
          <GameUIButton className="mx-auto" onClick={onExit}>
            exit
          </GameUIButton>
        </div>
      </SceneCanvas>
    </div>
  )
}

export default ResultScene

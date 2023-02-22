import * as UI from '@constants/ui'
import { Coords } from '@type/game'
import SecondsToHMS from '@utils/secondsFormat'
import { useAppSelector, useAppDispatch } from 'hooks/redux_typed_hooks'
import { nextLevel, startGame } from '@store/slices/game'
import * as SELECTORS from '@store/selectors'
import { width, height, center } from '@utils/winsize'
import SceneCanvas from '@game/components/SceneCanvas'
import GameUIButton from '@game/components/GameUIButton'
import RestartButton from '@game/components/RestartButton'
import QuitButton from '@game/components/QuitButton'
import './ResultScene.scss'

const margin = width * 0.4 > 200 ? 200 : width * 0.4
function _RenderStroke(
  ctx: CanvasRenderingContext2D,
  lStr: string,
  rStr: string | number,
  coords: Coords,
  bold = false
) {
  ctx.fillStyle = UI.COLOR_ALMOST_WHITE
  ctx.font = `${bold ? '700' : '400'} 24px Minecraft`
  ctx.textAlign = 'left'
  ctx.fillText(lStr, coords[0] - margin, coords[1])
  ctx.textAlign = 'right'
  ctx.fillText(String(rStr), coords[0] + margin, coords[1])
}

function ResultScene() {
  const { levelNum, gameTotals } = useAppSelector(SELECTORS.selectGameTotals)
  const heroIsDead = useAppSelector(SELECTORS.selectHeroIsDead)
  const showPlayAgainButton = useAppSelector(SELECTORS.selectPlayAgain)
  const showContinueButton = useAppSelector(SELECTORS.selectContinue)
  const { killCount, coins, time, steps } = useAppSelector(SELECTORS.levelStats)
  const {
    killCount: totalKillCount,
    coins: totalCoins,
    time: totalTime,
    steps: totalSteps,
  } = gameTotals
  const score = useAppSelector(SELECTORS.selectLevelScore)
  const totalScore = useAppSelector(SELECTORS.selectGameScore)
  const dispatch = useAppDispatch()

  const startNextLevel = () => {
    dispatch(nextLevel())
  }
  const playAgain = () => {
    dispatch(startGame())
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

    ctx.fillStyle = isLevelCompleted ? UI.COLOR_YELLOW : UI.COLOR_DIRTY_PINK
    ctx.font = `700 ${isLevelCompleted ? '43px' : '36px'} Minecraft`

    curHeight += 40
    ctx.fillText(resultMessage, center.width, curHeight)

    curHeight += 24 * 2 + 25
    _RenderStroke(
      ctx,
      'score',
      isGameCompleted ? totalScore : score,
      [center.width, curHeight],
      true
    )

    curHeight += 24 * 2
    _RenderStroke(
      ctx,
      'killed enemies',
      isGameCompleted ? totalKillCount : killCount,
      [center.width, curHeight]
    )

    curHeight += 24 * 2
    _RenderStroke(ctx, 'gathered coins', isGameCompleted ? totalCoins : coins, [
      center.width,
      curHeight,
    ])

    curHeight += 24 * 2
    _RenderStroke(
      ctx,
      'time spent',
      isGameCompleted ? SecondsToHMS(totalTime) : SecondsToHMS(time),
      [center.width, curHeight]
    )

    curHeight += 24 * 2
    _RenderStroke(ctx, 'steps', isGameCompleted ? totalSteps : steps, [
      center.width,
      curHeight,
    ])
  }

  let onLvlCompletedBtn = null
  if (isLevelCompleted) {
    if (showContinueButton) {
      onLvlCompletedBtn = (
        <GameUIButton className="mx-auto" onClick={startNextLevel}>
          Continue
        </GameUIButton>
      )
    } else if (showPlayAgainButton) {
      onLvlCompletedBtn = (
        <GameUIButton className="mx-auto" onClick={playAgain}>
          Play again
        </GameUIButton>
      )
    }
  }
  return (
    <div className="res-scene__results">
      <SceneCanvas draw={sceneDrawer} width={width} height={100 + height / 2}>
        <div className="res-scene__buttons mt-4">
          {onLvlCompletedBtn}
          {/* TODO uncomment when savepoints are available */}
          {/* {heroIsDead ? (
            <GameUIButton className="mx-auto" onClick={resumeFromSaved}>
              resume from saved
            </GameUIButton>
          ) : null} */}
          <RestartButton className="mx-auto" />
          <QuitButton className="mx-auto" />
        </div>
      </SceneCanvas>
    </div>
  )
}

export default ResultScene

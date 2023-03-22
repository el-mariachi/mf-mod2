import { useEffect } from 'react'
import { ProgressBar } from '@game/animations/ProgressBar'
import { useWinSize } from '@hooks/useWinSize'
import { Text } from '@utils/fillCanvas'
import { useAppDispatch } from 'hooks/redux_typed_hooks'
import { startGame } from '@store/slices/game'
import * as UI from '@constants/ui'
import SceneCanvas from '@game/components/SceneCanvas'
import resources from '@game/mocks/resources'
import { calcCenter } from '@utils/game'
import { delay } from '@utils/index'

const MIN_LOAD_SCENE_PLAYING_TIME = 2500
function LoadScene() {
  const winSize = useWinSize()
  const [width, height] = winSize
  const center = calcCenter(winSize)
  const dispatch = useAppDispatch()

  const sceneDrawer: CanvasDrawingFunction = ctx => {
    const progressBar: ProgressBar = new ProgressBar({
      color: UI.COLOR_ALMOST_WHITE,
      ctx,
      x: center[0] - 82,
      y: center[1] + 72,
      width: 165,
      heigth: 15,
    })
    progressBar.draw()
    const text = new Text({
      ctx,
      textBaseline: 'top',
      fillStyle: UI.COLOR_ALMOST_WHITE,
      textAlign: 'center',
      font: '400 24px Minecraft',
    })
    text.fill('One Bit', center[0], center[1] - 90, {
      font: '700 59px Minecraft',
      fillStyle: UI.COLOR_YELLOW,
    })
    text.fill('Dungeon', center[0], center[1] - 38, {
      font: '700 48px Minecraft',
      fillStyle: UI.COLOR_YELLOW,
    })
    text.fill('loading...', center[0], center[1] + 68, {
      textBaseline: 'bottom',
    })
  }

  useEffect(() => {
    Promise.all([delay(MIN_LOAD_SCENE_PLAYING_TIME), ...resources.load()]).then(
      () => {
        dispatch(startGame())
      }
    )
  }, [])

  return <SceneCanvas draw={sceneDrawer} width={width} height={height} />
}

export default LoadScene

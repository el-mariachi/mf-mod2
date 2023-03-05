import { useEffect } from 'react'
import { ProgressBar } from '@game/animations/ProgressBar'
import { width, height, center } from '@utils/winsize'
import { Text } from '@utils/fillCanvas'
import { useAppDispatch } from 'hooks/redux_typed_hooks'
import { startGame } from '@store/slices/game'
import * as UI from '@constants/ui'
import SceneCanvas from '@game/components/SceneCanvas'
import resources from '@game/mocks/resources'
import { delay } from '@utils/index'

const MIN_LOAD_SCENE_PLAYING_TIME = 2500
function LoadScene() {
  const dispatch = useAppDispatch()

  const sceneDrawer: CanvasDrawingFunction = ctx => {
    const progressBar: ProgressBar = new ProgressBar({
      color: UI.COLOR_ALMOST_WHITE,
      ctx,
      x: center.width - 82,
      y: center.height + 72,
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
    text.fill('One Bit', center.width, center.height - 90, {
      font: '700 59px Minecraft',
      fillStyle: UI.COLOR_YELLOW,
    })
    text.fill('Dungeon', center.width, center.height - 38, {
      font: '700 48px Minecraft',
      fillStyle: UI.COLOR_YELLOW,
    })
    text.fill('loading...', center.width, center.height + 68, {
      textBaseline: 'bottom',
    })
  }

  useEffect(() => {
    // TODO it`mock. memory leak possible, will fixed in TS-111
    Promise.all([delay(MIN_LOAD_SCENE_PLAYING_TIME), ...resources.load()]).then(
      () => dispatch(startGame())
    )
  }, [])

  return <SceneCanvas draw={sceneDrawer} width={width} height={height} />
}

export default LoadScene

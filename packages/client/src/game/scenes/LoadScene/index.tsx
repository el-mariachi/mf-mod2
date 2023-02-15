import { useEffect } from 'react'
import { ProgressBar } from '@game/animations/ProgressBar'
import { width, height, center } from '@utils/winsize'
import { Text } from '@utils/fillCanvas'
import { useAppDispatch } from 'hooks/redux_typed_hooks'
import { startGame } from '@store/slices/game'
import * as GAME from '@game/core/constants'
import SceneCanvas from '@game/components/SceneCanvas'

function LoadScene() {
  const dispatch = useAppDispatch()

  const sceneDrawer: CanvasDrawingFunction = ctx => {
    const progressBar: ProgressBar = new ProgressBar({
      color: GAME.COLOR_WHITE,
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
      fillStyle: GAME.TXT_FONT_LIGHT_COLOR,
      textAlign: 'center',
      font: '400 24px Minecraft',
    })
    text.fill('One Bit', center.width, center.height - 90, {
      font: '700 59px Minecraft',
      fillStyle: GAME.CAPTION_FONT_COLOR,
    })
    text.fill('Dungeon', center.width, center.height - 38, {
      font: '700 48px Minecraft',
      fillStyle: GAME.CAPTION_FONT_COLOR,
    })
    text.fill('loading...', center.width, center.height + 68, {
      textBaseline: 'bottom',
    })
  }

  useEffect(() => {
    // TODO it`mock, need resources manager
    setTimeout(() => dispatch(startGame()), 5000)
  }, [])

  return <SceneCanvas draw={sceneDrawer} width={width} height={height} />
}

export default LoadScene

import { FC } from 'react'
import { useAppSelector } from 'hooks/redux_typed_hooks'
import LoadScene from '@scenes/LoadScene'
import StartScene from '@scenes/StartScene'
import ResultScene from '@game/scenes/ResultScene'
import MapScene from '@scenes/MapScene'
import { currentScene as selectCurrentScene } from '@store/selectors'
import SCENES from '@constants/scenes'
import { authorizedPageAccessOpts, LoggedInCheck } from 'hoc/LoggedInCheck'

type scenesType = Record<SCENES, FC<SceneProps>>
const scenes: scenesType = {
  [SCENES.LOAD_SCENE]: LoadScene,
  [SCENES.START_SCENE]: StartScene,
  [SCENES.RESULT_SCENE]: ResultScene,
  [SCENES.MAP_SCENE]: MapScene,
}

function GamePage() {
  const currentScene =
    (useAppSelector(selectCurrentScene) as SCENES) || SCENES.LOAD_SCENE
  const Scene = scenes[currentScene]

  return <Scene />
}

export default LoggedInCheck(authorizedPageAccessOpts)(GamePage)

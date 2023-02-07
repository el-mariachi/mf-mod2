import { FC } from 'react'
import { useAppSelector } from 'hooks/redux_typed_hooks'
import { useNavigate } from 'react-router-dom'
import LoadScene from '@scenes/LoadScene'
import StartScene from '@scenes/StartScene'
import ResultScene from '@scenes/ResultsScreen/Scene'
import MapScene from '@scenes/MapScene'
import { currentScene as currentSceneSelector } from '@store/selectors'
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
  //  const currentScene = SCENES.LOAD_SCENE
  const currentScene =
    (useAppSelector(currentSceneSelector) as SCENES) || SCENES.LOAD_SCENE
  const Scene = scenes[currentScene]
  const navigate = useNavigate()
  const onExit = () => {
    navigate('/leaderboard')
  }

  return <Scene onExit={onExit} />
}

export default LoggedInCheck(authorizedPageAccessOpts)(GamePage)

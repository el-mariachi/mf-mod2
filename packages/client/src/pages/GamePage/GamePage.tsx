import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadScene from '@game/scenes/LoadScene'
import StartScene from '@game/scenes/StartScene'
import ResultScene from '@game/scenes/ResultsScreen/Scene/ResScene'
import MapScene from '@game/scenes/MapScene'
import { currentScene as currentSceneSelector } from '../../store/selectors'
import SCENES from '../../constants/scenes'

type scenesType = Record<SCENES, FC<SceneProps>>

const scenes: scenesType = {
  [SCENES.LOAD_SCENE]: LoadScene,
  [SCENES.START_SCENE]: StartScene,
  [SCENES.RESULT_SCENE]: ResultScene,
  [SCENES.MAP_SCENE]: MapScene,
}

function GamePage() {
  const currentScene =
    (useSelector(currentSceneSelector) as SCENES) || SCENES.LOAD_SCENE
  const Scene = scenes[currentScene]
  const navigate = useNavigate()
  const onExit = () => {
    navigate('/leaderboard')
  }

  return <Scene onExit={onExit} />
}

export default GamePage

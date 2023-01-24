import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadScene from '@scenes/LoadScene'
import StartScene from '@scenes/StartScene'
import ResultScene from '@scenes/ResultsScreen/Scene'
import MapScene from '@scenes/MapSceneNext'
import { currentScene as currentSceneSelector } from '@store/selectors'
import SCENES from '@constants/scenes'

type scenesType = Record<SCENES, FC<SceneProps>>

const scenes: scenesType = {
  [SCENES.LOAD_SCENE]: LoadScene,
  [SCENES.START_SCENE]: StartScene,
  [SCENES.RESULT_SCENE]: ResultScene,
  [SCENES.MAP_SCENE]: MapScene,
}

function GamePage() {
  const currentScene = SCENES.MAP_SCENE
  // (useSelector(currentSceneSelector) as SCENES) || SCENES.LOAD_SCENE
  const Scene = scenes[currentScene]
  const navigate = useNavigate()
  const onExit = () => {
    navigate('/leaderboard')
  }

  return <Scene onExit={onExit} />
}

export default GamePage

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadScene from '../../game/scenes/LoadScene'
import StartScene from '../../game/scenes/StartScene'
import ResultScene from '../../game/scenes/ResultsScreen/Scene/ResScene'
import MapScene from '../../game/scenes/MapScene'
import { currentScene as currentSceneSelector } from '../../store/selectors'
import * as SCENES from '../../constants/scenes'

type sceneType = typeof LoadScene | typeof StartScene | typeof StartScene

type scenesType = Record<string, sceneType>

const scenes: scenesType = {
  [SCENES.LOAD_SCENE]: LoadScene,
  [SCENES.START_SCENE]: StartScene,
  [SCENES.RESULT_SCENE]: ResultScene,
  [SCENES.MAP_SCENE]: MapScene,
}

function GamePage() {
  const currentScene = useSelector(currentSceneSelector) || SCENES.LOAD_SCENE
  const Scene = scenes[currentScene]
  const navigate = useNavigate()
  const onExit = () => {
    navigate('/leaderboard')
  }

  return <Scene onExit={onExit} />
}

export default GamePage

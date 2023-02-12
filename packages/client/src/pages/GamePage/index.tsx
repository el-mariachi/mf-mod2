import { FC } from 'react'
import { useAppSelector } from 'hooks/redux_typed_hooks'
import { useNavigate } from 'react-router-dom'
import LoadScene from '@scenes/LoadScene'
import StartScene from '@scenes/StartScene'
import ResultScene from '@scenes/ResultsScreen/Scene'
import MapScene from '@scenes/MapScene'
import MapSceneNext from '@game/scenes/MapSceneNext'
import { currentScene as selectCurrentScene } from '@store/selectors'
import { useAppDispatch } from 'hooks/redux_typed_hooks'
import SCENES from '@constants/scenes'
import { authorizedPageAccessOpts, LoggedInCheck } from 'hoc/LoggedInCheck'
import { exitGame } from '@store/slices/game'
import GameInfo from '@game/components/GameInfo'
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
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onExit = () => {
    dispatch(exitGame())
    navigate('/leaderboard')
  }

  return (
    <>
      <Scene onExit={onExit} />
      {currentScene === SCENES.RESULT_SCENE ? null : <GameInfo />}
    </>
  )
}

export default LoggedInCheck(authorizedPageAccessOpts)(GamePage)

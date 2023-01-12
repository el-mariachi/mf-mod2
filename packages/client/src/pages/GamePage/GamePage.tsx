import { useSelector, useDispatch } from 'react-redux'
import LoadScene from '../../game/scenes/LoadScene'
import StartScene from '../../game/scenes/StartScene'
import ResultScene from '../../game/scenes/ResultsScreen/Scene/ResScene'
//import MapScene from '../../game/scenes/MapScene'
import React from 'react'
import { currentScene as currentSceneSelector } from '../../store/selectors'
import { actions } from '../../store'
import * as SCENES from '../../constants/scenes'

type sceneType = typeof LoadScene | typeof StartScene | typeof StartScene

type scenesType = Record<string, sceneType>

const scenes: scenesType = {
  [SCENES.LOAD_SCENE]: LoadScene,
  [SCENES.START_SCENE]: StartScene,
  [SCENES.RESULT_SCENE]: ResultScene,
}

console.log('actions', actions)

function GamePage() {
  const currentScene = useSelector(currentSceneSelector) || SCENES.RESULT_SCENE
  const Scene = scenes[currentScene]
  return <Scene />
}

export default GamePage

/*
- состояние (status) загрузка ресурсов (спрайтов, шрифтов, контроллеров, пр) "resourcesLoading"
- показ стартовой сцены 
- загрузка ресурсов 
- ресурсы загружены 
- #изменение состояния "resourceReady"
- показ экрана с кнопками "start new game", "resume game", "exit", "settings"
- #изменение состояния "gameLoading"
- показ прогрессбара
- загрузка сохраненной игры или новой, загрузка контроллеров
- игра загружена, контроллеры инициализированы
- #статус изменен на "gameReady"
- показ поля игры
- завершение игры
- #статус изменен "GameEnds"
- показ "Резельтаты игры"
- нажатие кнопки Exit
- статус изменен "GameOut"
- показ лидерборда
*/

import {
  createSlice,
  PayloadAction,
  ThunkAction,
  AnyAction,
} from '@reduxjs/toolkit'
import SCENES from '@constants/scenes'
import { RootState } from '@store/index'
import { resetHeroResources } from '@store/slices/hero'
import { computeScore } from '@utils/computeScore'
import {
  gameInitialState,
  LifeControllerState,
  GameIntaractions,
  noInteraction,
} from '@constants/game'
import type { GameSlice, GameStats, GameIntaractionDef } from '@constants/game'

// const resetLevelStats = (state: GameSlice) => {
//   state.levelStats = gameInitialState.levelStats
// }

const updateTotals = (state: GameSlice) => {
  // console.log('updateTotals state', state)
  state.gameTotals.coins += state.levelStats.coins
  state.gameTotals.killCount += state.levelStats.killCount
  state.gameTotals.steps += state.levelStats.steps
  state.gameTotals.time += state.levelStats.time
  state.score += computeScore(state.levelStats, state.currentLevel)
  // console.log(
  //   'updateTotals totals',
  //   state.gameTotals,
  //   computeScore(state.levelStats, state.currentLevel)
  // )
  // resetLevelStats(state)
}
const invertStats = (levelStats: GameSlice['levelStats']) => {
  const invertedStats = Object.keys(levelStats).reduce((result, current) => {
    const key = current as keyof typeof levelStats
    return Object.assign(result, {
      [current]: -levelStats[key],
    })
  }, {})
  // console.log(invertedStats)
  return invertedStats
}

const slicer = (initState: GameSlice) =>
  createSlice({
    name: 'game',
    initialState: initState,
    reducers: {
      // levels
      startLevel(state, action: PayloadAction<number>) {
        const nextLevel = action.payload
        if (nextLevel > state.totalLevels) {
          // просто защита. Решение начинать/не начинать уровень по идее принимает контроллер
          return
        }
        return {
          ...state,
          currentLevel: nextLevel,
          levelStats: initState.levelStats,
          levelComplete: false,
          currentScene: SCENES.MAP_SCENE,
          lifeControllerState: LifeControllerState.RUNNING,
        }
      },
      endLevel(state) {
        state.levelComplete = true
        state.lifeControllerState = LifeControllerState.PAUSED
        console.log('lifeControllerState paused')
        updateTotals(state)
        state.currentScene = SCENES.RESULT_SCENE
      },
      // game
      pauseGame(state) {
        state.lifeControllerState = LifeControllerState.PAUSED
      },
      resumeGame(state) {
        state.currentScene = SCENES.MAP_SCENE
        state.lifeControllerState = LifeControllerState.RUNNING
      },
      exitGame(state) {
        state.currentScene = SCENES.LOAD_SCENE
        state.lifeControllerState = LifeControllerState.PAUSED
        state.levelStats = initState.levelStats
      },
      die(state) {
        state.lifeControllerState = LifeControllerState.PAUSED
        state.currentScene = SCENES.RESULT_SCENE
      },
      regInteraction(state, action: PayloadAction<GameSlice['interaction']>) {
        state.interaction = action.payload
      },
      clearInteractions(state) {
        state.interaction = noInteraction
      },
      // scenes
      showLoadScene(state) {
        // TODO скорее всего, не нужно здесь
        state.currentScene = SCENES.LOAD_SCENE
      },
      showStartScene(state) {
        // Используется в хуке useNavToGame. Возможно будет удаляться
        state.currentScene = SCENES.START_SCENE
      },
      showResultScene(state) {
        state.currentScene = SCENES.RESULT_SCENE
      },
      // stats
      resetTotals(state) {
        state.gameTotals = initState.gameTotals
      },
      updateStats(
        state,
        action: PayloadAction<Partial<GameSlice['levelStats']>>
      ) {
        const statDeltas = action.payload
        state.levelStats = {
          ...state.levelStats,
          ...Object.keys(statDeltas).reduce((result, current) => {
            const key = current as keyof typeof statDeltas
            return Object.assign(result, {
              [current]: state.levelStats[key] + (statDeltas[key] || 0),
            })
          }, {}),
        }
      },
    },
  })

const generateSlice = (initState: GameSlice) => slicer(initState).reducer

const gameSlice = slicer(gameInitialState)

export const {
  startLevel,
  endLevel,
  pauseGame,
  resumeGame,
  exitGame,
  die,
  regInteraction,
  clearInteractions,
} = gameSlice.actions

export const { showLoadScene, showStartScene, showResultScene } =
  gameSlice.actions

export const { resetTotals, updateStats } = gameSlice.actions

export const startGame =
  (): ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
    dispatch(resetHeroResources())
    dispatch(resetTotals())
    dispatch(startLevel(1))
  }
export const restartLevel =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const { currentLevel, levelStats } = getState().game
    dispatch(resetHeroResources())
    dispatch(updateStats(invertStats(levelStats)))
    dispatch(startLevel(currentLevel))

    // TODO temporary hack: reinit map scene: touch result scene, then immediately resumeGame
    dispatch(showResultScene())
    setTimeout(() => dispatch(resumeGame()), 1)
  }
export const finishLevel =
  (): ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
    dispatch(endLevel())
    // TODO save stats to server
  }
export const nextLevel =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const { currentLevel } = getState().game
    dispatch(resetHeroResources())
    dispatch(startLevel(currentLevel + 1))
  }

export default generateSlice

export { LifeControllerState, GameIntaractions }
export type { GameStats, GameIntaractionDef }

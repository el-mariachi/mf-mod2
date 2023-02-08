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

export enum TurnControllerState {
  RUNNING,
  PAUSED,
}

export enum GameIntaractions {
  NONE = 'none',
  ATTACK = 'attack',
  DAMAGE = 'damage',
  COLLECT = 'collect',
  OPEN = 'open',
  // ...
}

export type GameIntaractionDef = {
  type: GameIntaractions
  progress: number
  position: [number, number]
  // ...
}

export type GameStats = {
  killCount: number
  coins: number
  time: number
  steps: number
}

export type GameSlice = {
  turnControllerState: TurnControllerState
  currentScene: SCENES
  interaction: GameIntaractionDef // | null // как вариант
  currentLevel: number
  totalLevels: number
  levelComplete: boolean
  levelStats: GameStats
  gameTotals: GameStats
  score: number
}

const noInteraction: GameIntaractionDef = {
  type: GameIntaractions.NONE,
  progress: 0,
  position: [0, 0],
}

export const initialState: GameSlice = {
  turnControllerState: TurnControllerState.PAUSED,
  currentScene: SCENES.LOAD_SCENE,
  interaction: noInteraction,
  currentLevel: 0,
  totalLevels: 1,
  levelComplete: false,
  levelStats: {
    killCount: 0,
    coins: 0,
    time: 0,
    steps: 0,
  },
  gameTotals: {
    killCount: 0,
    coins: 0,
    time: 0,
    steps: 0,
  },
  score: 0,
}

const resetLevelStats = (state: typeof initialState) => {
  state.levelStats = initialState.levelStats
}

const updateTotals = (state: typeof initialState) => {
  state.gameTotals.coins += state.levelStats.coins
  state.gameTotals.killCount += state.levelStats.killCount
  state.gameTotals.steps += state.levelStats.steps
  state.gameTotals.time += state.levelStats.time
  state.score += computeScore(state.levelStats, state.currentLevel)
  resetLevelStats(state)
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
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
        levelStats: initialState.levelStats,
        levelComplete: false,
        currentScene: SCENES.MAP_SCENE,
        turnControllerState: TurnControllerState.RUNNING,
      }
    },
    endLevel(state) {
      state.levelComplete = true
      state.turnControllerState = TurnControllerState.PAUSED
      updateTotals(state)
      state.currentScene = SCENES.RESULT_SCENE
    },
    // game
    pauseGame(state) {
      state.turnControllerState = TurnControllerState.PAUSED
    },
    resumeGame(state) {
      state.currentScene = SCENES.MAP_SCENE
      state.turnControllerState = TurnControllerState.RUNNING
    },
    exitGame(state) {
      state.currentScene = SCENES.LOAD_SCENE
      state.turnControllerState = TurnControllerState.PAUSED
      state.levelStats = initialState.levelStats
    },
    die(state) {
      state.turnControllerState = TurnControllerState.PAUSED
      state.currentScene = SCENES.RESULT_SCENE
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
    updateStats(
      state,
      action: PayloadAction<Partial<typeof initialState['levelStats']>>
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

export const { startLevel, endLevel, pauseGame, resumeGame, exitGame, die } =
  gameSlice.actions

export const { showLoadScene, showStartScene, showResultScene } =
  gameSlice.actions

export const { updateStats } = gameSlice.actions

export const startGame =
  (): ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
    dispatch(resetHeroResources())
    dispatch(startLevel(1))
  }
export const restartLevel =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const { currentLevel } = getState().game
    dispatch(resetHeroResources())
    dispatch(startLevel(currentLevel))
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

export default gameSlice.reducer

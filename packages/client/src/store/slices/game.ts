import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import SCENES from '@constants/scenes'

export enum NextMove {
  PLAYER,
  WORLD,
}

export enum GameState {
  RUNNING,
  PAUSED,
}

export const initialState = {
  gameState: GameState.PAUSED,
  currentScene: SCENES.LOAD_SCENE,
  currentLevel: 1,
  totalLevels: 1,
  nextMove: NextMove.PLAYER,
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
}

const resetLevelStats = (state: typeof initialState) => {
  state.levelStats = initialState.levelStats
}

const updateTotals = (state: typeof initialState) => {
  state.gameTotals.coins += state.levelStats.coins
  state.gameTotals.killCount += state.levelStats.killCount
  state.gameTotals.steps += state.levelStats.steps
  state.gameTotals.time += state.levelStats.time
  resetLevelStats(state)
}

const endGame = (state: typeof initialState) => {
  state.gameState = GameState.PAUSED
  updateTotals(state)
  state.currentScene = SCENES.RESULT_SCENE
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    // start/stop/pause/resume
    startGame(state) {
      return {
        ...state,
        gameState: GameState.RUNNING,
        currentScene: SCENES.MAP_SCENE,
      }
    },
    finishGame(state) {
      endGame(state)
    },
    pauseGame(state) {
      state.gameState = GameState.PAUSED
      // TODO какую сцену показывать в паузе? Пока ставим RESULT_SCENE
      state.currentScene = SCENES.RESULT_SCENE
    },
    resumeGame(state) {
      state.currentScene = SCENES.MAP_SCENE
      state.gameState = GameState.RUNNING
    },
    // levels
    finishLevel(state) {
      const nextLevelNumber = state.currentLevel + 1
      if (nextLevelNumber > state.totalLevels) {
        endGame(state)
        return
      }
      updateTotals(state)
      state.gameState = GameState.PAUSED
      // TODO какую сцену показывать в паузе? Пока ставим RESULT_SCENE
      state.currentScene = SCENES.RESULT_SCENE
    },
    resetLevel(state) {
      resetLevelStats(state)
      state.gameState = GameState.RUNNING
    },
    nextLevel(state) {
      state.currentLevel += 1
      resetLevelStats(state)
      state.currentScene = SCENES.MAP_SCENE
    },
    // scene selectors
    showLoader(state) {
      // TODO скорее всего, не нужно здесь
      state.currentScene = SCENES.LOAD_SCENE
    },
    showStartScene(state) {
      // TODO скорее всего, не нужно, как отдельый редюсер
      state.currentScene = SCENES.START_SCENE
    },
    // layer stats
    kill(state) {
      state.levelStats.killCount += 1
    },
    collectCoin(state) {
      state.levelStats.coins += 1
    },
    collectCoins(state, action: PayloadAction<number>) {
      state.levelStats.coins += action.payload
    },
    step(state) {
      state.levelStats.steps += 1
    },
    addTime(state, action: PayloadAction<number>) {
      state.levelStats.time += action.payload
    },
    // turns
    giveMoveToPlayer(state) {
      state.nextMove = NextMove.PLAYER
    },
    giveMoveToWorld(state) {
      state.nextMove = NextMove.WORLD
    },
  },
})

export const {
  startGame,
  finishGame,
  pauseGame,
  resumeGame,
  finishLevel,
  resetLevel,
  nextLevel,
} = gameSlice.actions

export const { giveMoveToPlayer, giveMoveToWorld } = gameSlice.actions

// TODO скорее всего, не нужно
export const { showLoader, showStartScene } = gameSlice.actions

export const { kill, collectCoin, collectCoins, step, addTime } =
  gameSlice.actions

export default gameSlice.reducer

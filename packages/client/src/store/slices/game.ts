import { createSlice } from '@reduxjs/toolkit'
import SCENES from '@constants/scenes'

export interface InitialState {
  currentScene: SCENES
  level: number
  levelStats: ResultsProps
}

export const initialState: InitialState = {
  currentScene: SCENES.LOAD_SCENE,
  level: 1,
  levelStats: {
    levelNum: 1,
    killCount: 100,
    coins: 50,
    time: 60,
    steps: 1114,
  },
}

interface ResultsProps {
  levelNum: number
  killCount: number
  coins: number
  time: number
  steps: number
}

export enum ActionType {
  restartGame,
  startGame,
  nextLevel,
  showLoader,
  finishLevel,
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    restartGame(state) {
      state.currentScene = SCENES.MAP_SCENE
    },
    startGame(state) {
      state.currentScene = SCENES.MAP_SCENE
    },
    nextLevel(state) {
      state.level += 1
      state.currentScene = SCENES.MAP_SCENE
    },
    showLoader(state) {
      state.currentScene = SCENES.LOAD_SCENE
    },
    showStartScene(state) {
      state.currentScene = SCENES.START_SCENE
    },
    finishLevel(state, action) {
      state.currentScene = SCENES.RESULT_SCENE
      state.levelStats = action.payload.stats
    },
  },
})

export default gameSlice

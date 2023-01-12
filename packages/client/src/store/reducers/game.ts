import { createSlice } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

export interface InitialState {
  currentScreen: string
  level: 1
  levelStats: ResultsProps
}

export const initialState: InitialState = {
  currentScreen: 'loadScene',
  level: 1,
  levelStats: {
    levelNum: 1,
    killCount: 0,
    coins: 0,
    time: 0,
    steps: 0,
  },
}

interface ResultsProps {
  levelNum: number
  killCount: number
  coins: number
  time: number
  steps: number
}
const navigate = useNavigate()

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    restartGame(state, action) {
      state.currentScreen = 'mapScene'
    },
    startGame(state, action) {
      state.currentScreen = 'mapScene'
    },
    nextLevel(state, action) {
      state.level += 1
      state.currentScreen = 'mapScene'
    },
    showLoader(state, action) {
      state.currentScreen = 'loadScene'
    },
    finishLevel(state, action) {
      state.currentScreen = 'resultScene'
      state.levelStats = action.payload.stats
    },
    exit(state, action) {
      navigate('/liderboard')
    },
  },
})

export const {
  restartGame,
  startGame,
  nextLevel,
  showLoader,
  finishLevel,
  exit,
} = gameSlice.actions
export default gameSlice.reducer

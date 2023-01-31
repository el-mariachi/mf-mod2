import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './slices/game'

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
})

export const actions = gameSlice.actions

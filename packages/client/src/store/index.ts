import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './slices/game'
import userSlice from './slices/user'

export const store = configureStore({
  reducer: {
    game: gameSlice,
    user: userSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

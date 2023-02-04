import { configureStore } from '@reduxjs/toolkit'
import gameSlice from '@store/slices/game'
import userSlice from '@store/slices/user'
import heroSlice from '@store/slices/hero'

export const store = configureStore({
  reducer: {
    game: gameSlice,
    user: userSlice,
    hero: heroSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import gameSlice from '@store/slices/game'
import userSlice from '@store/slices/user'
import heroSlice from '@store/slices/hero'

import { gameInitialState } from '@constants/game'
import { userInitialState } from '@constants/user'
import { heroInitialState } from '@constants/hero'

export const store = configureStore({
  reducer: {
    game: gameSlice(gameInitialState),
    user: userSlice(userInitialState),
    hero: heroSlice(heroInitialState),
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

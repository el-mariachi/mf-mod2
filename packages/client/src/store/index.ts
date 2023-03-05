import { configureStore } from '@reduxjs/toolkit'
import gameSlice from '@store/slices/game'
import userSlice from '@store/slices/user'
import heroSlice from '@store/slices/hero'
import { gameInitialState } from '@constants/game'
import { heroInitialState } from '@constants/hero'
import { userInitialState } from '@constants/user'

const fallBackState = {
  game: gameInitialState,
  hero: heroInitialState,
  user: userInitialState,
}

export const store = configureStore({
  reducer: {
    game: gameSlice,
    user: userSlice,
    hero: heroSlice,
  },
  preloadedState: RENDERED_ON_SERVER
    ? fallBackState
    : window.__PRELOADED_STATE__,
  devTools: {
    name: 'The real McCoy',
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import type { EnhancedStore } from '@reduxjs/toolkit'
import gameSlice from '@store/slices/game'
import userSlice from '@store/slices/user'
import heroSlice from '@store/slices/hero'
import { gameInitialState, GameSlice } from '@constants/game'
import { heroInitialState, HeroSlice } from '@constants/hero'
import { userInitialState, UserSlice } from '@constants/user'

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
type RootStore = EnhancedStore<{
  game: GameSlice
  hero: HeroSlice
  user: UserSlice
}>
export type RootState = ReturnType<RootStore['getState']>

export type AppDispatch = RootStore['dispatch']

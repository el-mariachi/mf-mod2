import { configureStore } from '@reduxjs/toolkit'
import gameSlice from '@store/slices/game'
import heroSlice from '@store/slices/hero'

// ! user slice refactored for testing ssr
import userSlice from '@store/slices/user-ssr'
import { gameInitialState } from '@constants/game'
import { heroInitialState } from '@constants/hero'
import { userInitialState } from '@constants/user'
import { RootState } from '@store/index'

const fallBackStates = {
  game: gameInitialState,
  hero: heroInitialState,
  user: userInitialState,
}

export const createSSRStore = (states: RootState = fallBackStates) =>
  configureStore({
    reducer: {
      game: gameSlice(states.game),
      hero: heroSlice(states.hero),
      user: userSlice(states.user),
    },
  })

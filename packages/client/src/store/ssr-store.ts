import { configureStore } from '@reduxjs/toolkit'
import gameSlice from '@store/slices/game'
import heroSlice from '@store/slices/hero'
import userSlice from '@store/slices/user'
import forumSlice from '@store/slices/forum'
import { gameInitialState } from '@constants/game'
import { heroInitialState } from '@constants/hero'
import { userInitialState } from '@constants/user'
import { forumInitialState } from '@constants/forum'
import { RootState } from '@store/index'

const fallBackStates = {
  game: gameInitialState,
  hero: heroInitialState,
  user: userInitialState,
  forum: forumInitialState,
}

export const createSSRStore = (states: RootState = fallBackStates) =>
  configureStore({
    reducer: {
      game: gameSlice(states.game),
      hero: heroSlice(states.hero),
      user: userSlice(states.user),
      forum: forumSlice(states.forum),
    },
  })

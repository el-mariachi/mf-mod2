import { configureStore } from '@reduxjs/toolkit'
import gameSlice from '@store/slices/game'
import userSlice from '@store/slices/user'
import heroSlice from '@store/slices/hero'
import forumSlice from '@store/slices/forum'

import { gameInitialState } from '@constants/game'
import { heroInitialState } from '@constants/hero'
import { userInitialState } from '@constants/user'
import { forumInitialState } from '@constants/forum'

const fallBackState = {
  game: gameInitialState,
  hero: heroInitialState,
  user: userInitialState,
  forum: forumInitialState,
}

export const store = configureStore({
  reducer: {
    game: gameSlice,
    user: userSlice,
    hero: heroSlice,
    forum: forumSlice,
  },
  preloadedState: RENDERED_ON_SERVER
    ? fallBackState
    : window.__PRELOADED_STATE__,
  devTools: {
    name: 'The real McCoy',
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

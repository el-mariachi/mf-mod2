import { configureStore } from '@reduxjs/toolkit'
import gameSlice from '@store/slices/game'
import userSlice from '@store/slices/user'
import playerSlice from '@store/slices/player'

export const store = configureStore({
  reducer: {
    game: gameSlice,
    user: userSlice,
    player: playerSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

import type { RootState } from '../index'

export const game = (state: RootState) => state.game
export const levelStats = (state: RootState) => game(state).levelStats
export const currentScene = (state: RootState) => game(state).currentScene

export const selectUserData = (state: RootState) => state.user.data
export const selectLoadingStatus = (state: RootState) =>
  state.user.loadingStatus
export const selectLoginStatus = (state: RootState) => state.user.loginStatus

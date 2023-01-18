import type { RootState } from '../index'

export const game = (state: RootState) => state.game
export const levelStats = (state: RootState) => game(state).levelStats
export const currentScene = (state: RootState) => game(state).currentScene

export const selectUser = (state: RootState) => state.user

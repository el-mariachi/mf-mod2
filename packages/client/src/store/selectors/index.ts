import { RootState } from '../slices/type'

export const game = (state: RootState) => state.game
export const levelStats = (state: RootState) => game(state).levelStats
export const currentScene = (state: RootState) => game(state).currentScene

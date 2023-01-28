import type { RootState } from '../index'

// game slice selectors
export const game = (state: RootState) => state.game
export const levelStats = (state: RootState) => ({
  ...game(state).levelStats,
  levelNum: game(state).currentLevel,
})
export const currentScene = (state: RootState) => game(state).currentScene
export const selectMove = (state: RootState) => game(state).nextMove
export const selectPaused = (state: RootState) => game(state).gameState
// add currentLevel stats to gameTotals
export const selectGameTotals = (state: RootState) => {
  const { gameTotals, levelStats } = game(state)
  Object.keys(gameTotals).forEach(key => {
    const kkey = key as keyof typeof gameTotals
    gameTotals[kkey] += levelStats[kkey]
  })
  return { gameTotals, levelNum: game(state).currentLevel }
}

// user slice selectors
export const selectUserData = (state: RootState) => state.user.data
export const selectLoadingStatus = (state: RootState) =>
  state.user.loadingStatus
export const selectLoginStatus = (state: RootState) => state.user.loginStatus

// player slice selectors
export const selectPlayer = (state: RootState) => state.player

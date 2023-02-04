import type { RootState } from '../index'
import { computeScore } from '@utils/computeScore'

// game slice selectors
export const game = (state: RootState) => state.game

export const levelStats = (state: RootState) => ({
  ...game(state).levelStats,
  levelNum: game(state).currentLevel,
})

export const currentScene = (state: RootState) => game(state).currentScene

export const selectPaused = (state: RootState) =>
  game(state).turnControllerState

// add currentLevel stats to gameTotals
export const selectGameTotals = (state: RootState) => {
  const { gameTotals, levelStats } = game(state)
  Object.keys(gameTotals).forEach(key => {
    const kkey = key as keyof typeof gameTotals
    gameTotals[kkey] += levelStats[kkey]
  })
  return { gameTotals, levelNum: game(state).currentLevel }
}

export const selectLevelScore = (state: RootState) => {
  return computeScore(game(state).levelStats, game(state).currentLevel)
}

export const selectGameScore = (state: RootState) => game(state).score

// user slice selectors
export const selectUserData = (state: RootState) => state.user.data
export const selectLoadingStatus = (state: RootState) =>
  state.user.loadingStatus
export const selectLoginStatus = (state: RootState) => state.user.loginStatus

// hero slice selectors
export const selectHero = (state: RootState) => state.hero
export const selectHealth = (state: RootState) => state.hero.health
export const selectHeroResources = (state: RootState) => state.hero.resources

import type { RootState } from '@store/index'
import { computeScore } from '@utils/computeScore'
import { TurnControllerState } from '@store/slices/game'

// game slice selectors
export const game = (state: RootState) => state.game

export const levelStats = (state: RootState) => ({
  ...game(state).levelStats,
  levelNum: game(state).currentLevel,
})

export const currentScene = (state: RootState) => game(state).currentScene

export const selectPaused = (state: RootState) =>
  game(state).turnControllerState === TurnControllerState.PAUSED

// add currentLevel stats to gameTotals
export const selectGameTotals = (state: RootState) => {
  const { gameTotals, levelStats } = game(state)
  const totals = { ...gameTotals }
  Object.keys(gameTotals).forEach(stat => {
    const key = stat as keyof typeof gameTotals
    totals[key] += levelStats[key]
  })
  return { gameTotals: totals, levelNum: game(state).currentLevel }
}

export const selectLevelScore = (state: RootState) =>
  computeScore(game(state).levelStats, game(state).currentLevel)

export const selectGameScore = (state: RootState) => {
  return (
    computeScore(game(state).levelStats, game(state).currentLevel) +
    game(state).score
  )
}

// result screen button selectors
export const selectContinue = (state: RootState) =>
  game(state).levelComplete &&
  game(state).currentLevel < game(state).totalLevels
export const selectPlayAgain = (state: RootState) =>
  game(state).levelComplete &&
  game(state).currentLevel === game(state).totalLevels

// interactions
export const selectInteraction = (state: RootState) => game(state).interaction

// user slice selectors
export const selectUserData = (state: RootState) => state.user.data
export const selectLoadingStatus = (state: RootState) =>
  state.user.loadingStatus
export const selectLoginStatus = (state: RootState) => state.user.loginStatus

// hero slice selectors
export const selectHero = (state: RootState) => state.hero
export const selectHealth = (state: RootState) => ({
  health: state.hero.health,
  maxHealth: state.hero.maxHealth,
})
export const selectHeroResources = (state: RootState) => state.hero.resources
// death
export const selectHeroIsDead = (state: RootState) => state.hero.health === 0

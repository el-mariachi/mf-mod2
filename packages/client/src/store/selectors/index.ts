import type { RootState } from '@store/index'
import { computeScore } from '@utils/computeScore'
import { LifeControllerState } from '@store/slices/game'

// game slice selectors
export const game = (state: RootState) => state.game

export const levelStats = (state: RootState) => ({
  ...game(state).levelStats,
  levelNum: game(state).currentLevel,
})

export const currentScene = (state: RootState) => game(state).currentScene

export const selectPaused = (state: RootState) =>
  game(state).lifeControllerState === LifeControllerState.PAUSED

// add currentLevel stats to gameTotals
export const selectGameTotals = (state: RootState) => {
  const { gameTotals } = game(state)
  return { gameTotals, levelNum: game(state).currentLevel }
}

export const selectLevelScore = (state: RootState) =>
  computeScore(game(state).levelStats, game(state).currentLevel)

export const selectGameScore = (state: RootState) => {
  return computeScore(game(state).gameTotals, game(state).currentLevel)
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

/**forum*/
export const selectForum = (state: RootState) => state.forum
export const selectTopics = (state: RootState) => state.forum.topics
export const selectForumLoadingStatus = (state: RootState) =>
  state.forum.loadingStatus

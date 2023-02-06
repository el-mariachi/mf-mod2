import type { GameStats } from '@store/slices/game'

// example function to calculate score based on stats
export const computeScore = (stats: GameStats, level = 1) =>
  Object.keys(stats).reduce((total, current) => {
    const key = current as keyof GameStats
    return total + stats[key] * level
  }, 0)

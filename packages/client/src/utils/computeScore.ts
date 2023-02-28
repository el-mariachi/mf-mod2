import { GameStatType } from '@constants/game'
import type { GameStats } from '@store/slices/game'

// function to calculate score based on stats
export const computeScore = (stats: GameStats, level = 1) =>
  Object.keys(stats).reduce((total, current) => {
    const key = current as keyof GameStats
    let value = stats[key]
    switch (key) {
      case GameStatType.TIME:
        const seconds = Math.round(value / 1000)
        value = -Math.round(seconds / 15)
        break
      case GameStatType.COINS:
        value *= 5
        break
      case GameStatType.KILLS:
        value *= 50
        break
      case GameStatType.STEPS:
        value = -Math.round(value / 10)
        break
    }
    const result = total + value * level
    return result > 0 ? result : 0
  }, 0)

import type { GameStats } from '@store/slices/game'

// function to calculate score based on stats
export const computeScore = (stats: GameStats, level = 1) =>
  Object.keys(stats).reduce((total, current) => {
    const key = current as keyof GameStats
    let value: number
    switch (key) {
      case 'time':
        value = Math.round(stats[key] / 10)
        break
      case 'coins':
        value = stats[key] * 5
        break
      case 'killCount':
        value = stats[key] * 50
        break
      default: // steps
        value = stats[key]
        break
    }
    return total + value * level
  }, 0)

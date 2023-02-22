import { GameStats, GameStatType } from '@constants/game'
import { CollectableItem, MonsterUnit } from '@game/core/types'
import Timer from '@game/utils/Timer'
import { store } from '@store/index'
import { updateStats } from '@store/slices/game'

export default class StatisticController {
  public timer: Timer
  constructor() {
    this.timer = new Timer()
  }
  regMonsterKill(monster?: MonsterUnit) {
    this.regStep({
      [GameStatType.KILLS]: 1,
    })
  }
  regItemCollect(item?: CollectableItem) {
    this.regStep({
      [GameStatType.COINS]: 1,
    })
  }
  regStep(
    stepStats: Omit<
      Partial<GameStats>,
      GameStatType.STEPS | GameStatType.TIME
    > = {}
  ) {
    this.registrate({
      ...stepStats,
      ...{
        [GameStatType.TIME]: this.timer.sincePrevElapsed,
        [GameStatType.STEPS]: 1,
      },
    })
  }
  registrate(stats: Partial<GameStats>) {
    store.dispatch(updateStats(stats))
  }
}

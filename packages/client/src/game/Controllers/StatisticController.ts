import { GameStats, GameStatType } from '@constants/game'
import { Collectable, GameItemName, Monster } from '@type/game'
import Timer from '@utils/Timer'
import { store } from '@store/index'
import { updateStats } from '@store/slices/game'

export default class StatisticController {
  public timer: Timer
  constructor() {
    this.timer = new Timer()
  }
  regMonsterKill(monster?: Monster, withStep = false) {
    const stat = {
      [GameStatType.KILLS]: 1,
    }
    withStep ? this.regWithStep(stat) : this.registrate(stat)
  }
  regItemCollect(item?: Collectable, withStep = false) {
    if (GameItemName.coin == item?.name) {
      const stat = {
        [GameStatType.COINS]: 1,
      }
      withStep ? this.regWithStep(stat) : this.registrate(stat)
    }
  }
  regStep() {
    this.registrate(this._stepStats)
  }
  regWithStep(
    stats: Omit<Partial<GameStats>, GameStatType.STEPS | GameStatType.TIME> = {}
  ) {
    this.registrate({
      ...stats,
      ...this._stepStats,
    })
  }
  registrate(stats: Partial<GameStats>) {
    store.dispatch(updateStats(stats))
  }
  protected get _stepStats() {
    return {
      [GameStatType.TIME]: this.timer.sincePrevElapsed,
      [GameStatType.STEPS]: 1,
    }
  }
}

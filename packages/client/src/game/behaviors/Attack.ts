import * as Types from '@type/game'
import { getBehaviorAnimatedProcess } from '@game/behaviors'
import { emptyAnimationProcess } from '@constants/game'

export default class Attack implements Types.AttackBehavior {
  constructor(protected _subject: Types.Attacker) {}
  with(target: Types.Destroyable) {
    let behavior = {
      process: emptyAnimationProcess,
      result: {
        attacker: this._subject,
        points: 0,
      },
    } as Types.AttackResult
    if (this._subject.isOnMap && target.isOnMap) {
      if (this._subject?.attack) {
        behavior = this._subject.attack(target)
      } else {
        const process = getBehaviorAnimatedProcess(
          Types.AttackMotionType.attack,
          this._subject,
          target.cell as Types.LevelMapCell
        )
        behavior = {
          process,
          result: this._calcPoints(),
        }
      }
    }
    return (this._subject.prevBehavior = behavior)
  }
  protected _calcPoints() {
    const { strength } = this._subject
    let { criticalAttackChance = 0, criticalAttackLevel = 0 } = this._subject

    criticalAttackChance = Math.abs(criticalAttackChance)
    if (criticalAttackChance > 1) {
      criticalAttackChance = 1
    }
    criticalAttackLevel = Math.abs(criticalAttackLevel)
    if (criticalAttackLevel > 1) {
      criticalAttackLevel = 1
    }

    let points = strength
    if (criticalAttackChance >= Math.random()) {
      points += strength * criticalAttackLevel
    }

    return {
      attacker: this._subject,
      points: Math.round(points),
    } as Types.AttackDef
  }
}

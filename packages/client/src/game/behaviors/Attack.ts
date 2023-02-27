import * as Types from '@type/game'
import { getBehaviorAnimatedProcess } from '@game/behaviors'

export default class Attack implements Types.AttackBehavior {
  constructor(protected _subject: Types.Attacker) {}
  with(target: Types.Destroyable) {
    let behavior
    if (this._subject?.attack) {
      behavior = this._subject.attack(target)
    } else {
      const process = getBehaviorAnimatedProcess(
        Types.AttackMotionType.attack,
        this._subject,
        target.cell
      )

      behavior = {
        process,
        result: this._calcPoints(),
      }
    }
    this._subject.curBehavior = behavior
    return behavior
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

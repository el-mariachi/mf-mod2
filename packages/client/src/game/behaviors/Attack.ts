import * as Types from '@type/game'
import * as Behaviors from '@game/behaviors'
import { defineDirection } from '@utils/game'
import { emptyAnimationProcess } from '@constants/game'

export default class Attack implements Types.AttackBehavior {
  constructor(protected _subject: Types.Attacker) {}
  with(target: Types.Destroyable) {
    if (this._subject?.attack) {
      return this._subject.attack(target)
    } else {
      const dir: Types.AxisDirection = defineDirection(
        this._subject.cell.position,
        target.cell.position
      )

      return {
        process:
          this._subject.view.do?.(Behaviors[`attack2${dir}`]) ??
          emptyAnimationProcess,
        result: this._calcPoints(),
      }
    }
  }
  protected _calcPoints() {
    const { strength: strength } = this._subject
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
    if (Math.random() <= criticalAttackChance) {
      points += strength * criticalAttackLevel
    }

    return {
      attacker: this._subject,
      points: Math.round(points),
    } as Types.AttackDef
  }
}

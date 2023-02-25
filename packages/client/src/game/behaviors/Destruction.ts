import * as Types from '@type/game'
import { emptyAnimationProcess } from '@constants/game'
import { defineDirection } from '@utils/game'

export default class Destruction implements Types.DamageBehavior {
  constructor(protected _subject: Types.Destroyable) {}
  with(damage: Types.AttackDef) {
    const { points: damagePoints, attacker } = damage

    if (this._subject?.damage) {
      return this._subject.damage(damage)
    } else {
      const dir: Types.AxisDirection = defineDirection(
        this._subject.cell.position,
        attacker.cell.position
      )
      const behavior = {
        type: Types.DestructionMotionType.destruction,
        dir,
      } as Types.UnitBehaviorDef

      this._applyDamage(damagePoints)

      return {
        process: this._subject.view.do?.(behavior) ?? emptyAnimationProcess,
        result: this._hasDestroyed(),
      }
    }
  }
  protected _applyDamage(damagePoints: number) {
    this._subject.health -= damagePoints
  }
  protected _hasDestroyed() {
    return this._subject.health <= 0
  }
}
